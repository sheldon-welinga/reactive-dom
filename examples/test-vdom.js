// Forgive me on the example, am still in the process of patching everthing here so we won't have alot of boiler plate

import { $createVDOM, $diff, $mount, $renderApp } from "../dom/index.js";

// Example
const $vApp = (count) =>
  $createVDOM("div", {
    attrs: { id: "app", "data-count": count },
    children: [
      String(count),
      $createVDOM("img", {
        attrs: {
          style: "max-height:20rem",
          src: "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg",
        },
      }),
      $createVDOM("input"),
    ],
  });

let count = 1;
let app = $renderApp($vApp(count));
let rootEl = $mount(app, document.getElementById("app2"));

setInterval(() => {
  count++;
  const newVApp = $vApp(count);
  const $patch = $diff(app, newVApp);
  rootEl = $patch(rootEl);
  app = newVApp;
}, 1000);
