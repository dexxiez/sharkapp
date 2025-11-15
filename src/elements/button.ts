import { BaseComponent } from "./base-component";
import type { BaseElementOptions } from "./types";

export interface ButtonOptions extends BaseElementOptions {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export class Button extends BaseComponent<ButtonOptions> {
  constructor(options: ButtonOptions) {
    super("button", options);
  }

  public override initialize(): void {
    const buttonEl = this.element as HTMLButtonElement;

    if (this.options.onClick) {
      this.element.addEventListener("click", this.options.onClick);
    }

    if (this.options.disabled) {
      buttonEl.disabled = true;
    }

    if (this.options.type) {
      buttonEl.type = this.options.type;
    }
  }

  public override destroy(): void {
    if (this.options.onClick) {
      this.element.removeEventListener("click", this.options.onClick);
    }
  }
}

// Factory function for convenience
export const button = (options: ButtonOptions): HTMLElement =>
  new Button(options).render();
