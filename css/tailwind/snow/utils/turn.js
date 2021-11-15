import postcss from "postcss";
import tailwindcss from "tailwindcss";
import defaultConfig from "tailwindcss/stubs/simpleConfig.stub.js";
import autoprefixer from "autoprefixer";

import config from "../tailwind.config";

async function buildTailwindCss(tailwindConfig, postCssInput) {
  const { css } = await postcss([
    tailwindConfig ? tailwindcss(tailwindConfig) : tailwindcss(defaultConfig),
    autoprefixer,
  ]).process(postCssInput, { from: "tailwind.css" });

  return css;
}

let input = `
.button {
  background: #81e6d9;
  padding: 1.6rem 4.6rem;
  letter-spacing: 0.03rem;
  border-radius: 0.2rem;
  width: 30%;
  height: 2.5rem;
}

.button:hover {
  background: #2c7a7b;
}

@media (min-width: 640px) {
  .button {
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 1280px) {
  .button {
    padding: 3rem 7rem;
    margin-bottom: 2.4rem;
  }
}
`;

buildTailwindCss(null, input).then(console.log).catch(console.error);
