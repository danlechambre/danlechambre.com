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

export async function filmLoader(filmsJson: any) {
  const promises = filmsJson.map((film: any) => getFilm(film.id));
  const films = await Promise.all(promises);

  return films.map((film, i) => ({
    ...film,
    id: film?.id ?? crypto.randomUUID(),
    dateCompleted: filmsJson[i].dateCompleted,
  }));
}

export async function getFilm(imdbId: string) {
  const apiConfig = await getTmdbConfig();
  if (typeof apiConfig === "undefined") {
    throw new Error(`[getFilm] Could not get config for TMDB`);
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
      throw new Error(`[getFilm] Could not get TV film: ${imdbId}`);
    }

    const result = await response.json();

    const filmDetails = result.movie_results.find(
      (f: any) => f.original_language === "en",
    );

    const contentItem = {
      id: imdbId,
      title: filmDetails.title,
      imageUrl:
        apiConfig.images.secure_base_url +
        (apiConfig.images.poster_sizes[1] ?? "original") +
        filmDetails.poster_path,
    };

    return contentItem;
  } catch (error) {
    console.error((error as Error).message);
  }
}
