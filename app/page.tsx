import { Suspense } from "react";
import PokeList from "./components/PokeList";
import { Chunk } from "./types/Chunk";
import { createDeferredGenerator } from "./utils/createDeferredGenerator";
import Total from "./components/Total";
import { generatorComponent } from "./utils/generatorComponent";
//TODO: Make this component work with RSC import { Total } from "./components/Total";

export default async function Home() {
  const deferred = createDeferredGenerator<Chunk, Chunk>();

  return (
    <main>
      {/*TODO: Make this component to work ---> await Total({ deferred })*/}
      <Suspense fallback={<div>Loading data...</div>}>
        <PokeList deferred={deferred} />
      </Suspense>
    </main>
  );
}
