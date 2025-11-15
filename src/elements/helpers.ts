import type { Child } from "./types";

/**
 * Conditionally render an element
 * @example
 * renderIf(true, div({ children: "Hello, world!" }));
 * // => <div>Hello, world!</div>
 */
export const renderIf = (
  condition: boolean,
  element: Child | Child[],
): Child | Child[] => {
  return condition ? element : null;
};

/**
 * Conditionally render an element or an else element
 * @example
 * renderIfElse(true, div({ children: "Hello, world!" }), div({ children: "Hello, world!" }));
 * // => <div>Hello, world!</div>
 */
export const renderIfElse = (
  condition: boolean,
  element: Child | Child[],
  elseElement: Child | Child[],
): Child | Child[] => {
  return condition ? element : (elseElement ?? null);
};
