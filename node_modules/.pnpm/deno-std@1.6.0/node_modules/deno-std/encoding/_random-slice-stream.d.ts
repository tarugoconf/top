type Sliceable = {
  slice(start?: number, end?: number): Sliceable;
  length: number;
};
export declare class RandomSliceStream<T extends Sliceable>
  extends TransformStream<T, T> {
  constructor();
}
export {};
