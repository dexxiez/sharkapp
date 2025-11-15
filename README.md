# SharkApp

A lightweight DOM framework for ESM modules.

## Installation

Not on NPM yet lol keep dreaming

```bash
npx --package=pnpm pnpm dlx pnpm add sharkapp
```

## Usage

### Basic Example

```javascript
import { sharkApp, div, button } from 'sharkapp';

const app = sharkApp({
  consume: [
    div({ children: 'Hello World!' }),
    button({
      children: 'Click me',
      onClick: () => console.log('Clicked!')
    })
  ],
  mountElement: document.getElementById('app')
});
```

### Component with State

```javascript
import { BaseComponent, signal, computed, effect, newElement } from 'sharkapp';

class Counter extends BaseComponent {
  initialize() {
    const count = signal(0);
    const doubled = computed(() => count() * 2);

    effect(() => {
      console.log('Count changed:', count());
      this.element.textContent = `Count: ${count()}, Doubled: ${doubled()}`;
    });

    // Use newElement to make a button with options
    const button = newElement('button', {
      children: 'Increment',
      style: { marginLeft: '10px' }
    });

    // Add event listener manually (like in button component)
    button.addEventListener('click', () => count[1](count[0] + 1));

    this.element.appendChild(button);
  }
}

// Use the component
const app = sharkApp({
  consume: new Counter({}),
  mountElement: document.getElementById('app')
});
```

## API

### Core
- `sharkApp({ consume, mountElement })` - Mount components/elements to a DOM element
- `newElement(tag, attrs?, children?)` - Create DOM elements

### Elements
- `div(options?)` - Create div element
- `button(options?)` - Create button element
- And more HTML elements...

### Components
- `BaseComponent` - Base class for custom components with lifecycle management

### State
- `signal(initialValue)` - Create reactive state (returns [getter, setter])
- `computed(fn)` - Create computed values
- `effect(fn)` - Run side effects on state changes (auto-cleaned up by components)

## Building

```bash
pnpm build
```

## License

MIT
