export type DeferredGenerator<TValue, TReturn = void> = {
  generator: () => AsyncGenerator<TValue, TReturn, unknown>;
  next: (chunk: { value: TValue; done?: boolean }) => void;
};
