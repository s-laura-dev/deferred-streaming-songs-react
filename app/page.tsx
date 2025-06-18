import { Suspense } from "react";
import { Chunk } from "./types/Chunk";
import { createDeferredGenerator } from "./utils/createDeferredGenerator";
import Total from "./components/Total";
import SongList from "./components/SongList";
import SongListLoading from "./components/SongListLoading";
import { maxOffset } from "./constants/settings";

export const experimental_ppr = true;

export default async function Home() {
  const deferred = createDeferredGenerator<Chunk, Chunk>();

  return (
    <main>
      <Total deferred={deferred} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
        <Suspense fallback={<SongListLoading items={maxOffset} />}>
          <SongList deferred={deferred} />
        </Suspense>
      </div>
    </main>
  );
}
