import { Chunk } from "../types/Chunk";
import { Song } from "../types/Pokemon";
import { DeferredGenerator } from "../types/DeferredGenerator";
import { Suspense } from "react";

const TotalMessage = ({ pokeLength }: { pokeLength: number }) => {
  return <p>Total Pokemons: {pokeLength}</p>;
};

async function TotalInner({
  deferred,
  pokemons = [],
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
  pokemons?: Song[];
}) {
  const iterator = deferred.generator();

  for await (const chunk of iterator) {
    if (chunk?.list && Array.isArray(chunk.list)) {
      pokemons.push(...chunk.list);
      console.log("Pokemon Length: ", pokemons.length);
      // Stream the updated count in a single <p> and continue with next chunk
      return (
        <>
          <Suspense fallback={<TotalMessage pokeLength={pokemons.length} />}>
            <TotalInner deferred={deferred} pokemons={pokemons} />
          </Suspense>
        </>
      );
    }
  }

  // Return the final count (or nothing if no new chunks)
  return <TotalMessage pokeLength={pokemons.length} />;
}

export default function Total({
  deferred,
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
}) {
  const pokemons: Song[] = [];
  return (
    <Suspense fallback={<TotalMessage pokeLength={pokemons.length} />}>
      <TotalInner deferred={deferred} pokemons={pokemons} />
    </Suspense>
  );
}
