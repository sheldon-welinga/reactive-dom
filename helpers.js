export const isNull = (val) => val === null;

export const isUndefined = (val) => val === undefined;

export const isSymbol = (val) => typeof val === "symbol";

export const isString = (val) => typeof val === "string";

export const isFunction = (val) => typeof val === "function";

export const isArray = (val) => Array.isArray(val);

export const isBoolean = (val) =>
  ["undefined", "boolean"].includes(typeof val) || val === null;

export const isObject = (val) => {
  return (
    !isNull(val) &&
    !isUndefined(val) &&
    !isArray(val) &&
    typeof val === "object"
  );
};
