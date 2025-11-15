import type { Effect } from "../state";
import { type BaseElementOptions, appendChildren } from "./types";

let currentComponent: BaseComponent<unknown> | null = null;

export const getCurrentlyInitializingComponent =
  (): BaseComponent<unknown> | null => {
    return currentComponent;
  };

// Base class for complex components with lifecycle and state management
export abstract class BaseComponent<TOptions = Record<string, unknown>> {
  protected element: HTMLElement;
  protected options: TOptions;

  public effects: Effect[] = [];
  public compooteds: (() => void)[] = [];

  constructor(tagName: string, options: TOptions & BaseElementOptions) {
    this.element = document.createElement(tagName);
    this.options = options;

    this.applyBaseOptions(options);
    this.init();
  }

  private applyBaseOptions = (options: BaseElementOptions): void => {
    if (options.id) this.element.id = options.id;
    if (options.class) this.element.className = options.class;

    if (options.style) {
      if (typeof options.style === "string") {
        this.element.setAttribute("style", options.style);
      } else {
        Object.assign(this.element.style, options.style);
      }
    }

    if (options.children) {
      appendChildren(this.element, options.children);
    }

    if (options.ref) {
      options.ref.current = this.element;
    }
  };

  private init = (): void => {
    const prev = currentComponent;
    currentComponent = this;
    try {
      if (this.initialize) {
        this.initialize();
      }
    } finally {
      currentComponent = prev;
    }
  };

  // Override this in subclasses to add event listeners, set up state, etc.
  protected abstract initialize(): void;

  // Return the underlying DOM element
  public render = (): HTMLElement => {
    return this.element;
  };

  // Cleanup method for removing listeners, etc.
  public destroy(): void {
    for (const effect of this.effects) {
      effect.dispose();
    }
    this.effects = [];

    for (const compooted of this.compooteds) {
      compooted();
    }
    this.compooteds = [];
  }
}
