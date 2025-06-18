import PokeCard from "./SongCard";
import sleep from "../utils/sleep";
import { Suspense } from "react";
import {  Song } from "../types/Pokemon";
import { Chunk } from "../types/Chunk";
import { DeferredGenerator } from "../types/DeferredGenerator";
import SongCard from "./SongCard";

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
  if (offset > 50) return null;
  const res = await fetch(
    `https://api.deezer.com/chart/0/tracks?index=${offset}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log("Data fetched:", data);
  deferred.next({ value: { list: data.data }, done: offset === 50 });

  return (
    <>
      {data.data.map((song: Song) => (
        <SongCard song={song} key={song.id} />
      ))}

        {/* <Suspense fallback={<div>Loading more...</div>}>
          <SongList deferred={deferred} offset={offset + limit} limit={limit} />
        </Suspense> */}

    </>
  );
}
