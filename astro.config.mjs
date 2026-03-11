// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import remarkDirective from "remark-directive";
import { processDirectivesPlugin } from "./src/utils/process-directives-plugin";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkDirective, processDirectivesPlugin],
  },
});
