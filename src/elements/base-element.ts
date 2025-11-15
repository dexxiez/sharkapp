import type { BaseElementOptions } from "./types";
import { appendChildren } from "./utils";

// Generic factory for creating HTML elements with common options
export const newElement = <T extends HTMLElement>(
  tagName: string,
  options: BaseElementOptions = {},
): T => {
  const el = document.createElement(tagName) as T;

  if (options.id) el.id = options.id;
  if (options.class) el.className = options.class;

  if (options.style) {
    if (typeof options.style === "string") {
      el.setAttribute("style", options.style);
    } else {
      Object.assign(el.style, options.style);
    }
  }

  if (options.children) {
    appendChildren(el, options.children);
  }

  if (options.ref) {
    options.ref.current = el;
  }

  return el;
};
