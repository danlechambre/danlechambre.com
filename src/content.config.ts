import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

import booksJson from "content/media-shelf/books.json";

import { bookLoader } from "./content-helpers/books";

const articles = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.string().date(),
    lastUpdatedDate: z.string().date(),
    state: z.enum(["notion", "forming", "realized", "reworked"]),
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

const books = defineCollection({
  loader: () => bookLoader(booksJson),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    description: z.string(),
    thumbnailSrc: z.string().url(),
    dateFinished: z.string().date(),
  }),
});

export const collections = { articles, musings, books };
