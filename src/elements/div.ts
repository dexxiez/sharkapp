export interface DivOptions {
  children: HTMLElement[];
}
export const div = (options: DivOptions) => {
  return new (class extends HTMLElement {
    constructor() {
      super();
      options.children.forEach((child) => {
        this.appendChild(child);
      });
    }
  })();
};
