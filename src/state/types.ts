export type EffectFn = () => void;

export interface Effect {
  fn: EffectFn;
  deps: Set<Set<Effect>>;
  run(): void;
  dispose(): void;
}

export type Signal<T> = [() => T, (value: T | ((prev: T) => T)) => void];
