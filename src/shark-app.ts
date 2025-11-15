import type { BaseComponent } from "./elements/base-component";

export type Consumable = BaseComponent<unknown> | HTMLElement;

export interface SharkApp {
  consume: Consumable | Consumable[];
  mountElement: HTMLElement;
}

export const sharkApp = (app: SharkApp) => {
  const consume = Array.isArray(app.consume) ? app.consume : [app.consume];
  for (const component of consume) {
    // Check if it's a BaseComponent with a render method, or a plain HTMLElement
    const element =
      component instanceof HTMLElement ? component : component.render();
    app.mountElement.appendChild(element);
  }
};
