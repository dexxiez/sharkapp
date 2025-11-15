import { getCurrentlyInitializingComponent } from "../elements/base-component";
import type { Effect, EffectFn, Signal } from "./types";

let currentEffect: Effect | null = null;

export const effect = (fn: EffectFn): Effect => {
  const effect: Effect = {
    fn,
    deps: new Set(),
    run() {
      // cleanup previous deps
      for (const dep of this.deps) {
        dep.delete(this);
      }
      this.deps.clear();

      const prev = currentEffect;
      currentEffect = this;
      try {
        this.fn();
      } finally {
        currentEffect = prev;
      }
    },
    dispose() {
      for (const dep of this.deps) {
        dep.delete(this);
      }
      this.deps.clear();
    },
  };

  const component = getCurrentlyInitializingComponent();
  if (component) {
    component.effects.push(effect);
  }

  effect.run();
  return effect;
};

// batching
let batchDepth = 0;
const pendingEffects = new Set<Effect>();

export const scheduleEffect = (effect: Effect) => {
  if (batchDepth > 0) {
    pendingEffects.add(effect);
  } else {
    effect.run();
  }
};

export const batch = <T>(fn: () => T): T => {
  batchDepth++;
  try {
    return fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0) {
      const effects = Array.from(pendingEffects);
      pendingEffects.clear();
      for (const e of effects) e.run();
    }
  }
};

// signals

export const signal = <T>(initial: T): Signal<T> => {
  let value = initial;
  const subscribers = new Set<Effect>();

  function read(): T {
    if (currentEffect) {
      subscribers.add(currentEffect);
      currentEffect.deps.add(subscribers);
    }
    return value;
  }

  function write(next: T | ((prev: T) => T)) {
    const nextValue =
      typeof next === "function" ? (next as (prev: T) => T)(value) : next;

    if (Object.is(nextValue, value)) return;

    value = nextValue;

    // snapshot in case effect graph mutates subscribers
    const effects = Array.from(subscribers);
    for (const effect of effects) {
      scheduleEffect(effect);
    }
  }

  return [read, write];
};

// computed

export const computed = <T>(fn: () => T): (() => T) => {
  const [value, setValue] = signal<T>(undefined as unknown as T);

  const eff = effect(() => {
    setValue(fn());
  });

  const component = getCurrentlyInitializingComponent();
  if (component) {
    component.computeds.push(() => eff.dispose());
  }

  return value;
};
