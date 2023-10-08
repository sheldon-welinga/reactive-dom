import { $reactive } from "./reactive.js";

class StateImpl {
  #value;

  constructor(initialValue) {
    this.#value = initialValue;
  }

  get value() {
    return $reactive({ value: this.#value }).value;
  }
}

export const $state = (initialValue) => {
  return new StateImpl(initialValue);
};

const state = $state(2);
