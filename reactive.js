import { isFunction, isObject } from "./helpers.js";

const _targetMap = new WeakMap();
const _activeEffects = new Set();
let _activeEffect;

export const $track = (target, key) => {
  if (_activeEffect) {
    let depsMap = _targetMap.get(target);

    if (!depsMap) {
      depsMap = new Map();
      _targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);

    if (!dep) {
      dep = new Set();
      depsMap.set(key, dep);
    }

    dep.add(_activeEffect);
  }
};

export const $trigger = (target, key) => {
  const depsMap = _targetMap.get(target);

  if (!depsMap) return;

  const deps = depsMap.get(key);

  if (deps) {
    deps.forEach((effect) => {
      effect();
    });
  }
};

export const $reactive = (target) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      $track(target, key);
      return result;
    },

    set(target, key, value, receiver) {
      let oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      if (result && oldValue != value) {
        $trigger(target, key);
      }

      return result;
    },
  });
};

export const $effect = (fn) => {
  if (isFunction(fn)) {
    _activeEffect = fn;
    fn();
    _activeEffects.add(fn);
    _activeEffect = undefined;
  }
};

export const $cleanupEffects = () => {
  _activeEffects.clear();
};

export const $computed = (fn) => {
  let _value;
  if (isFunction(fn)) {
    const effectFn = () => {
      _value = fn();
    };

    $effect(effectFn);
  }

  return {
    get value() {
      return isObject(_value) ? $reactive(_value) : _value;
    },
  };
};
