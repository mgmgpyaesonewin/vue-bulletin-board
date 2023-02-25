// import { mergeConfig } from "vite";
// import { defineConfig } from "vitest/config";
// import viteConfig from "./vite.config";

// export default mergeConfig(
//   viteConfig,
//   defineConfig({
//     test: {
//       setupFiles: "vuetify.config.js",
//       environment: 'jsdom',
//       deps: {
//         inline: ["vuetify"],
//       },
//       globals: true,
//     },
//   })
// );

import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  })
);
