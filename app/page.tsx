import { Suspense } from "react";
import PokeList from "./components/PokeList";
import { Chunk } from "./types/Chunk";
import { createDeferredGenerator } from "./utils/createDeferredGenerator";
import Total from "./components/Total";

//TODO: Make this component work with RSC import { Total } from "./components/Total";
export const experimental_ppr = true;

export default async function Home() {
  const deferred = createDeferredGenerator<Chunk, Chunk>();

  return (
    <main>
      <Total deferred={deferred} />

      <Suspense fallback={<div>Loading data...</div>}>
        <PokeList deferred={deferred} />
      </Suspense>
    </main>
  );
}
