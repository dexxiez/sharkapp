export interface ButtonOptions {
  click: () => void;
}

export const Button = (options: ButtonOptions) => {
  return new (class extends HTMLElement {
    constructor() {
      super();
      this.addEventListener("click", options.click);
    }
  })();
};
