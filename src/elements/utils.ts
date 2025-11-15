import { effect } from "../state/signals";
import type { Children } from "./types";

// Helper to append children to an element
export const appendChildren = (
  parent: HTMLElement,
  children: Children,
): void => {
  const childArray = Array.isArray(children) ? children : [children];

  childArray.forEach((child) => {
    if (child == null) return;

    if (child instanceof HTMLElement) {
      parent.appendChild(child);
    } else if (typeof child === "function") {
      // Handle reactive functions (computed values)
      const textNode = document.createTextNode("");
      parent.appendChild(textNode);

      effect(() => {
        textNode.textContent = String(child());
      });
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  });
};
