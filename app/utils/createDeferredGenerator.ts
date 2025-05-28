import { DeferredGenerator } from "../types/DeferredGenerator";

export function createDeferredGenerator<
  TValue,
  TReturn = void
>(): DeferredGenerator<TValue, TReturn> {
  let resolveQueue: (() => void) | null = null;
  const queue: Array<IteratorResult<TValue, TReturn>> = [];

  const generator = async function* (): AsyncGenerator<TValue, TReturn> {
    while (true) {
      if (queue.length === 0) {
        await new Promise<void>((resolve) => {
          resolveQueue = resolve;
        });
      }

      const item = queue.shift();
      if (!item) continue;
      if (item.done) {
        return item.value;
      }

      yield item.value;
    }
  };

  const next = (chunk: { value: TValue | TReturn; done?: boolean }) => {
    if (chunk.done) {
      queue.push({ done: true, value: chunk.value as TReturn });
    } else {
      queue.push({ done: false, value: chunk.value as TValue });
    }

    if (resolveQueue) {
      resolveQueue();
      resolveQueue = null;
    }
  };

  return {
    generator,
    next,
  };
}
