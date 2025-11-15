import { effect } from "../state/signals";

// Child types - elements can contain other elements, text, numbers, functions (for reactive values), or null/undefined
export type Child = HTMLElement | string | number | (() => any) | null | undefined;
export type Children = Child | Child[];

// Base options for all elements
export interface BaseElementOptions {
  id?: string;
  class?: string;
  style?: string | Partial<CSSStyleDeclaration>;
  children?: Children;
  ref?: { current: HTMLElement | null };
}

// Helper to append children to an element
export const appendChildren = (parent: HTMLElement, children: Children): void => {
  const childArray = Array.isArray(children) ? children : [children];

  childArray.forEach((child) => {
    if (child == null) return;

    if (child instanceof HTMLElement) {
      parent.appendChild(child);
    } else if (typeof child === 'function') {
      // Handle reactive functions (computed values)
      const textNode = document.createTextNode('');
      parent.appendChild(textNode);

      effect(() => {
        textNode.textContent = String(child());
      });
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  });
};
