import { isNull, isUndefined, isObject } from "../helpers.js";
import { $renderApp } from "./render.js";

const $zipArrays = (xs = [], ys = []) => {
  const zipped = [];

  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
};

const $diffChildren = (oldChildren = [], newChildren = []) => {
  const childPatches = [];
  for (const [oldChild, newChild] of $zipArrays(oldChildren, newChildren)) {
    childPatches.push($diff(oldChild, newChild));
  }

  const additionalPatches = [];

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild($renderApp(additionalChild));
      return $node;
    });
  }

  return ($parent) => {
    for (const [patch, child] of $zipArrays(childPatches, $parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

const $diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
  const patches = [];

  //Set new attributes
  for (const [key, value] of Object.entries(newAttrs)) {
    patches.push(($node) => {
      $node.setAttribute(key, value);
      return $node;
    });
  }

  //remove old attributes
  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      patches.push(($node) => {
        $node.removeAttribute(key);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

export const $diff = (oldNode, newNode) => {
  //If no new node, then just remove it
  if (isUndefined(newNode) || isNull(newNode)) {
    return ($node) => {
      $node.remove();
      return;
    };
  }

  //Old/New Virtual node may be a string|number|null|undefined
  if (!isObject(oldNode) || !isObject(newNode)) {
    if (oldNode !== newNode) {
      return ($node) => {
        const newAppNode = $renderApp(newNode);
        $node.replaceWith(newAppNode);
        return newAppNode;
      };
    } else {
      return ($node) => {};
    }
  }

  if (oldNode.tag !== newNode.tag) {
    return ($node) => {
      const newAppNode = $renderApp(newNode);
      $node.replaceWith(newAppNode);
      return newAppNode;
    };
  }

  const patchAttrs = $diffAttrs(oldNode.attrs, newNode.attrs);
  const patchChildren = $diffChildren(oldNode.children, newNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};
