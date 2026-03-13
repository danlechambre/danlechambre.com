import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.iso.date(),
    lastUpdatedDate: z.iso.date(),
    state: z.enum(["notion", "forming", "realised", "reworked"]),
    tags: z.string().array(),
  }),
});

const slashPages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/slash-pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
  }),
});

export const collections = {
  writing,
  slashPages,
};
