import sleep from "../utils/sleep";
import { Suspense } from "react";
import { Song } from "../types/Song";
import { Chunk } from "../types/Chunk";
import { DeferredGenerator } from "../types/DeferredGenerator";
import SongCard from "./SongCard";
import SongListLoading from "./SongListLoading";
import { maxOffset } from "../constants/settings";

interface SongListProps {
  offset?: number;
  limit?: number;
  deferred: DeferredGenerator<Chunk, Chunk>;
}

export default async function SongList({
  offset = 0,
  limit = 5,
  deferred,
}: SongListProps) {
  await sleep(1000);
  if (offset + limit > maxOffset) return null;
  const res = await fetch(
    `https://api.deezer.com/chart/0/tracks?index=${offset}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log("Data fetched:", data);
  deferred.next({
    value: { list: data.data },
    done: offset === maxOffset - limit,
  });

  return (
    <>
      {data.data.map((song: Song) => (
        <SongCard song={song} key={song.id} />
      ))}

      {
        <Suspense
          fallback={<SongListLoading items={maxOffset - offset - limit} />}
        >
          <SongList deferred={deferred} offset={offset + limit} limit={limit} />
        </Suspense>
      }
    </>
  );
}
