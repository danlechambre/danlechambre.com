import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "astro:env/server";

export async function musicLoader(musicJson: any) {
  const ids = musicJson.map((lp: any) => lp.spotifyId);
  const albums = await getAlbums(ids);

  return albums.map((lp: any, i: number) => ({
    ...lp,
    dateCompleted: musicJson[i].dateCompleted,
  }));
}

let bearerToken: string | null = null;

async function getAuthToken(clientId: string, clientSecret: string) {
  const url = "https://accounts.spotify.com/api/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  };

  const response = await fetch(url, options);
  const authDetails = await response.json();

  if (typeof authDetails.access_token !== "string") {
    throw new Error("[getSpotifyAuthToken]: could not get auth token");
  }

  bearerToken = authDetails.access_token;
  return bearerToken;
}

async function getAlbums(albumIds: Array<string>) {
  try {
    const token =
      bearerToken ??
      (await getAuthToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET));

    if (!token) {
      throw new Error("[getAlbums] could not get auth token");
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const idBatches = batchArray(albumIds, 20);

    let results: any = [];

    for (const batch of idBatches) {
      const params = new URLSearchParams();
      params.set("ids", batch.join(","));

      const url = `https://api.spotify.com/v1/albums?${params.toString()}`;

      const result = await fetch(url, options).then((response) =>
        response.json(),
      );

      if (Array.isArray(result.albums)) {
        results.push(...result.albums);
      }
    }

    if (results.length === 0) {
      throw new Error("[getAlbums]: Albums empty dude!");
    }

    return results.map((album: any) => ({
      id: album.id,
      imageUrl: getImageUrl(album.images),
      title: album.name,
      releaseDate: album.release_date,
      artists: album.artists.map((a: any) => a.name).join(", "),
      label: album.label,
    }));
  } catch (error) {
    console.error((error as Error).message);
  }

  return [];
}

function batchArray(items: Array<string>, batchSize: number) {
  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  return batches;
}

function getImageUrl(
  images: Array<{ url: string; width: number; height: number }>,
) {
  const img = images.find((x) => x.width === 300) ?? images[0];

  return img.url;
}
