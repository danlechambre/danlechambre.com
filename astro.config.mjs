// @ts-check
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
  env: {
    schema: {
      TMDB_API_READ_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      TMDB_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      RAWG_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      TWITCH_IGDB_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      TWITCH_IGDB_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      SPOTIFY_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
