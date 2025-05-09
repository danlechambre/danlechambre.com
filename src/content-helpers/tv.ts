import { TMDB_API_READ_TOKEN } from "astro:env/server";
import { z } from "astro:content";

// TODO - only partially implemented
const zTmdbConfig = z.object({
  images: z.object({
    base_url: z.string(),
    secure_base_url: z.string(),
    poster_sizes: z.string().array(),
  }),
});

type TmdbConfig = z.infer<typeof zTmdbConfig>;

let tmdbConfig: TmdbConfig | undefined;
async function getTmdbConfig() {
  if (!tmdbConfig) {
    // Call configuration API to get details for image URLs
    const configUrl = "https://api.themoviedb.org/3/configuration";
    const configOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_READ_TOKEN}`,
      },
    };

    try {
      const response = await fetch(configUrl, configOptions);
      if (!response.ok) {
        throw new Error(`[getTmdbConfig] Could not get TMDB config`);
      }

      const result = await response.json();
      tmdbConfig = result;
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  return tmdbConfig;
}

export async function tvShowLoader(tvShowsJson: any) {
  const promises = tvShowsJson.map((show: any) => getTvShow(show.id));
  const tvShows = await Promise.all(promises);

  return tvShows.map((show, i) => ({
    ...show,
    id: show?.id ?? crypto.randomUUID(),
    dateCompleted: tvShowsJson[i].dateCompleted,
  }));
}

export async function getTvShow(imdbId: string) {
  const apiConfig = await getTmdbConfig();
  if (typeof apiConfig === "undefined") {
    throw new Error(`[getTvShow] Could not get config for TMDB`);
  }

  const url = `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_READ_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`[getTvShow] Could not get TV show: ${imdbId}`);
    }

    const result = await response.json();

    const showDetails = result.tv_results[0];

    const contentItem = {
      id: imdbId,
      title: showDetails.name,
      imageUrl:
        apiConfig.images.secure_base_url +
        (apiConfig.images.poster_sizes[1] ?? "original") +
        showDetails.poster_path,
    };

    return contentItem;
  } catch (error) {
    console.error((error as Error).message);
  }
}
