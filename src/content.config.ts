import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

import booksJson from "content/media-shelf/books.json";
import tvShowsJson from "content/media-shelf/tvShows.json";
import filmsJson from "content/media-shelf/films.json";
import gamesJson from "content/media-shelf/games.json";

import { bookLoader } from "./content-helpers/books";
import { tvShowLoader } from "./content-helpers/tv";
import { filmLoader } from "./content-helpers/film";
import { gameLoader } from "./content-helpers/game";

const articles = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.string().date(),
    lastUpdatedDate: z.string().date(),
    state: z.enum(["notion", "forming", "realised", "reworked"]),
    tags: z.string().array(),
  }),
});

const slashPages = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/slashPages" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    slug: z.string(),
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
    dateCompleted: z.string().date(),
  }),
});

const tvShows = defineCollection({
  loader: () => tvShowLoader(tvShowsJson),
  schema: z.object({
    title: z.string(),
    imageUrl: z.string().url(),
    dateCompleted: z.any(), //fix
  }),
});

const films = defineCollection({
  loader: () => filmLoader(filmsJson),
  schema: z.object({
    title: z.string(),
    imageUrl: z.string().url(),
    dateCompleted: z.any(), //fix
  }),
});

const games = defineCollection({
  loader: () => gameLoader(gamesJson),
  schema: z.object({
    title: z.string(),
    imageUrl: z.string().url(),
    dateCompleted: z.any(),
  }),
});

export const collections = {
  articles,
  slashPages,
  musings,
  books,
  tvShows,
  films,
  games,
};
