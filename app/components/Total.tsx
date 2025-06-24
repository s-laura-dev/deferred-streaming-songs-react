import { Chunk } from "../types/Chunk";
import { Song } from "../types/Song";
import { DeferredGenerator } from "../types/DeferredGenerator";
import { Suspense } from "react";

const TotalMessage = ({ songsLength }: { songsLength: number }) => {
  return <p className="m-3">Total Songs Fetched: {songsLength}</p>;
};

async function TotalInner({
  deferred,
  songs = [],
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
  songs?: Song[];
}) {
  const iterator = deferred.generator();

  for await (const chunk of iterator) {
    if (chunk?.list && Array.isArray(chunk.list)) {
      songs.push(...chunk.list);
      console.log("Songs Length: ", songs.length);

      return (
        <>
          <Suspense fallback={<TotalMessage songsLength={songs.length} />}>
            <TotalInner deferred={deferred} songs={songs} />
          </Suspense>
        </>
      );
    }
  }

  console.log("Final Songs Length: ", songs.length);
  return <TotalMessage songsLength={songs.length} />;
}

export default function Total({
  deferred,
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
}) {
  const songs: Song[] = [];
  return (
    <Suspense fallback={<TotalMessage songsLength={songs.length} />}>
      <TotalInner deferred={deferred} songs={songs} />
    </Suspense>
  );
}
