import { newElement } from "./base-element";
import type { BaseElementOptions } from "./types";

// Simple HTML elements using factory pattern
export const div = (options?: BaseElementOptions) =>
  newElement<HTMLDivElement>("div", options);

export const main = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("main", options);

export const aside = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("aside", options);

export const article = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("article", options);

export const footer = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("footer", options);

export const header = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("header", options);

export const nav = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("nav", options);

export const section = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("section", options);

export const span = (options?: BaseElementOptions) =>
  newElement<HTMLSpanElement>("span", options);

export const strong = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("strong", options);

export const em = (options?: BaseElementOptions) =>
  newElement<HTMLElement>("em", options);

export const p = (options?: BaseElementOptions) =>
  newElement<HTMLParagraphElement>("p", options);
