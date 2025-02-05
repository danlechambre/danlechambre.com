import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "*.md", base: "content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.string().date(),
    lastUpdatedDate: z.string().date(),
    state: z.enum(["notion", "sketch", "realized", "reworked"]),
    tags: z.string().array(),
  }),
});

const musings = defineCollection({
  loader: file("content/musings/musings.json"),
  schema: z.object({
    createdDate: z.string().date(),
    lastUpdatedDate: z.string().date(),
    text: z.string(),
  }),
});

export const collections = { articles, musings };
