// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import remarkDirective from "remark-directive";
import { processDirectivesPlugin } from "./src/utils/process-directives-plugin";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkDirective, processDirectivesPlugin],
  },
  fonts: [
    {
      name: "Lora",
      cssVariable: "--font-serif",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Lora[wght].woff2"],
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/fonts/Lora-Italic[wght].woff2"],
          },
        ],
      },
    },
    {
      name: "Inter",
      cssVariable: "--font-display",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/InterVariable.woff2"],
          },
        ],
      },
    },
  ],
});
