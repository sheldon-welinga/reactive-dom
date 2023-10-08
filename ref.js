import { isObject } from "./helpers.js";
import { $track, $reactive } from "./reactive.js";

class RefImpl {
  #value;

  constructor(initialValue) {
    this.#value = this.#reactive(initialValue);
  }

  #reactive(val) {
    return isObject(val) ? $reactive(val) : val;
  }

  get value() {
    $track(this);
    return this.#value;
  }

  set value(newValue) {
    this.#value = this.#reactive(newValue);
  }
}

export const $ref = (value) => {
  return new RefImpl(value);
};
