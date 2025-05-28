import { Chunk } from "../types/Chunk";
import { Pokemon } from "../types/Pokemon";
import { DeferredGenerator } from "../types/DeferredGenerator";

// TODO: Make this component to work with the deferred generator
export async function* Total({
  deferred,
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
}) {
  const pokemons: Pokemon[] = [];
  const iterator = deferred.generator();

  for await (const chunk of iterator) {
    pokemons.push(...chunk.list);
    yield <p>Total Pokemons: {pokemons.length}</p>;
  }

  return <p>Total Pokemons: {pokemons.length}</p>;
}
