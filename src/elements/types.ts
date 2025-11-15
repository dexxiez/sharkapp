// Child types - elements can contain other elements, text, numbers, functions (for reactive values), or null/undefined
export type Child =
  | HTMLElement
  | string
  | number
  | (() => any)
  | null
  | undefined;
export type Children = Child | Child[];

// Base options for all elements
export interface BaseElementOptions {
  id?: string;
  class?: string;
  style?: string | Partial<CSSStyleDeclaration>;
  children?: Children;
  ref?: { current: HTMLElement | null };
}
