# Reactive DOM

Reactive DOM is a VanillaJS library for building web interfaces. Its a work in progress being built from scratch.

Its inspired by both VueJS, ReactJS and Svelte. So naming may be similar, however we are using `$` prefixes for its core functions.

## Basic Usage

Here's a quick example to demonstrate how to use Reactive DOM:

```js
import { $reactive, $effect, $computed } from "reactive-dom";

const state = $reactive({
  count: 0,
});

$effect(() => {
  console.log(`Count: ${state.count}`);
});

state.count++; // This will trigger the effect and log the updated count
```
