export declare function disposableStack(): {
  [Symbol.dispose]: () => void;
  disposables: Disposable[];
  defer(fn: () => void): void;
  use(val: Disposable): void;
};
