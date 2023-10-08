import { flatten, isObject } from "../helpers.js";

const $renderElement = ({ tag, attrs, children = [] }) => {
  const $el = document.createElement(tag);

  //Set attributes
  for (const [key, value] of Object.entries(attrs)) {
    $el.setAttribute(key, value);
  }

  //Set children
  for (const child of children) {
    const $child = $renderApp(child);
    $el.appendChild($child);
  }

  return $el;
};

export const $renderApp = (node) => {
  //Virtual node may be a string|number|null|undefined
  if (!isObject(node)) {
    //Fallback is so that incase its undefined|null we fallback to an empty string
    return document.createTextNode(node || "");
  }

  return $renderElement(node);
};

export const $createVDOM = (tag, { attrs = {}, children = [] } = {}) => {
  return {
    tag,
    attrs,
    children: flatten(children),
  };
};

export const $mount = (node, target) => {
  target.replaceWith(node);
  return node;
};
