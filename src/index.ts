export { sharkApp, type SharkApp, type Consumable } from "./shark-app";

// Base utilities
export { newElement as createElement } from "./elements/base-element";
export { BaseComponent } from "./elements/base-component";
export type { BaseElementOptions, Child, Children } from "./elements/types";

// Complex components (class-based)
export { Button, button, type ButtonOptions } from "./elements/button";

// Simple elements (factory-based)
export {
  div,
  main,
  aside,
  article,
  footer,
  header,
  nav,
  section,
  span,
  strong,
  em,
  p,
} from "./elements/div";

// State management
export { effect, signal, computed } from "./state";
export type { Effect, EffectFn, Signal } from "./state";
