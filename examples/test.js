import { $ref, $computed, $effect, $reactive } from "../index.js";

const count = $ref({ test: 1 });

const doubleCount = $computed(() => count.value.test * 2);

const render = () => {
  console.log("rendered");

  const html = `
        <div>
            Hello
            <div>
                <button style='padding:0.5rem 1rem; min-width:5rem;' $click="increase">${doubleCount.value}</button>
            </div>
        </div>
    `;
  document.getElementsByTagName("body")[0].innerHTML = html;
};

$effect(render);

const methods = {
  increase: () => {
    console.log(doubleCount.value, "Hey", count.value.test);
    count.value.test++;
  },
};

document.getElementById("app").addEventListener("click", (event) => {
  const clickAttribute = event.target.attributes["$click"];
  const methodName = clickAttribute && clickAttribute.value;

  if (clickAttribute && typeof methodName === "string") {
    const clickEvent = methods[methodName];

    if (clickEvent && typeof clickEvent === "function") clickEvent();
  }
});
