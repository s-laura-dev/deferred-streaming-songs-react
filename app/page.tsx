import { Suspense } from "react";
import { Chunk } from "./types/Chunk";
import { createDeferredGenerator } from "./utils/createDeferredGenerator";
import Total from "./components/Total";
import SongList from "./components/SongList";

export const experimental_ppr = true;

export default async function Home() {
  const deferred = createDeferredGenerator<Chunk, Chunk>();

  return (
    <main>
      <Total deferred={deferred} />

      <Suspense fallback={<div>Loading data...</div>}>
        <SongList deferred={deferred} />
      </Suspense>
    </main>
  );
}
