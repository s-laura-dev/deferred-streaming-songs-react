import { Chunk } from "../types/Chunk";
import { Pokemon } from "../types/Pokemon";
import { DeferredGenerator } from "../types/DeferredGenerator";
import { Suspense } from "react";

async function TotalInner({
  deferred,
  pokemons = [],
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
  pokemons: Pokemon[];
}) {
  const iterator = deferred.generator();

  for await (const chunk of iterator) {
    if (chunk?.list && Array.isArray(chunk.list)) {
      pokemons.push(...chunk.list);
      console.log("Pokemon Length: ", pokemons.length);
      // Stream each count immediately
      return (
        <div>
          <p key={pokemons.length}>{pokemons.length}</p>
          <Suspense fallback={null}>
            <TotalInner deferred={deferred} pokemons={pokemons} />
          </Suspense>
        </div>
      );
    }
  }

  return null; // No more chunks
}

export default function Total({
  deferred,
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
}) {
  const pokemons: Pokemon[] = [];
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TotalInner deferred={deferred} pokemons={pokemons} />
    </Suspense>
  );
}
