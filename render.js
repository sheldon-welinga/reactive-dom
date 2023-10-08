import { $effect } from "./effects";

export const $render = (html) => {
  $effect(() => {
    document.getElementById("app").innerHTML = html;
  });
};
