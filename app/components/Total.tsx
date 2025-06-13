import { Chunk } from "../types/Chunk";
import { Pokemon } from "../types/Pokemon";
import { DeferredGenerator } from "../types/DeferredGenerator";
import { generatorComponent } from "../utils/generatorComponent";

// TODO: Make this component to work with the deferred generator

const Total = generatorComponent(async function* Innie({
  deferred,
}: {
  deferred: DeferredGenerator<Chunk, Chunk>;
}) {
  const pokemons: Pokemon[] = [];
  const iterator = deferred.generator();

  for await (const chunk of iterator) {
    pokemons.push(...chunk.list);
    console.log("Pokemon Length: ", pokemons.length);
    yield <p>{pokemons.length}</p>;
  }

  return <p>{pokemons.length}</p>;
});

export default Total;
