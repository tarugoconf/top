// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function abortable(p, signal) {
  if (p instanceof Promise) {
    return abortablePromise(p, signal);
  } else {
    return abortableAsyncIterable(p, signal);
  }
}
function abortablePromise(p, signal) {
  const { promise, reject } = Promise.withResolvers();
  const abort = () => reject(signal.reason);
  if (signal.aborted) {
    abort();
  }
  signal.addEventListener("abort", abort, { once: true });
  return Promise.race([promise, p]).finally(() => {
    signal.removeEventListener("abort", abort);
  });
}
async function* abortableAsyncIterable(p, signal) {
  signal.throwIfAborted();
  const { promise, reject } = Promise.withResolvers();
  const abort = () => reject(signal.reason);
  signal.addEventListener("abort", abort, { once: true });
  const it = p[Symbol.asyncIterator]();
  let completed = false;
  try {
    while (true) {
      const { done, value } = await Promise.race([promise, it.next()]);
      if (done) {
        completed = true;
        const result = await it.return?.(value);
        return result?.value;
      }
      yield value;
    }
  } finally {
    signal.removeEventListener("abort", abort);
    // Close the source on abort or early consumer exit; the done path has
    // already closed it with the forwarded return value.
    if (!completed) {
      await it.return?.();
    }
  }
}
