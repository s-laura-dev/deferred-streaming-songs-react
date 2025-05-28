import { Suspense } from "react";
import PokeList from "./components/PokeList";
import { Chunk } from "./types/Chunk";
import { createDeferredGenerator } from "./utils/createDeferredGenerator";
//TODO: Make this component work with RSC import { Total } from "./components/Total";

export default async function Home() {
  const deferred = createDeferredGenerator<Chunk, Chunk>();
  return (
    <main>
      <Suspense fallback={<div>Loading data...</div>}>
        <PokeList deferred={deferred} />
      </Suspense>
    </main>
  );
}
