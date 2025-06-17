import PokeCard from "./PokeCard";
import sleep from "../utils/sleep";
import { Suspense } from "react";
import { Pokemon } from "../types/Pokemon";
import { Chunk } from "../types/Chunk";
import { DeferredGenerator } from "../types/DeferredGenerator";

interface PokeListProps {
  offset?: number;
  limit?: number;
  deferred: DeferredGenerator<Chunk, Chunk>;
}

export default async function PokeList({
  offset = 0,
  limit = 5,
  deferred,
}: PokeListProps) {
  await sleep(1000);
  if (offset > 50) return null;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log("Data fetched:", data.next);
  deferred.next({ value: { list: data.results }, done: offset === 50 });

  return (
    <div>
      {data.results.map((pokemon: Pokemon) => (
        <PokeCard pokemon={pokemon} key={pokemon.name} />
      ))}
      {data.next && (
        <Suspense fallback={<div>Loading more...</div>}>
          <PokeList deferred={deferred} offset={offset + limit} limit={limit} />
        </Suspense>
      )}
    </div>
  );
}
