import {
  TWITCH_IGDB_CLIENT_ID,
  TWITCH_IGDB_CLIENT_SECRET,
} from "astro:env/server";

export async function gameLoader(gamesJson: any) {
  const ids = gamesJson.map((g: any) => g.igdbId);
  const games = await getGames(ids);

  return games.map((g: any, i: number) => ({
    ...g,
    dateCompleted: gamesJson[i].dateCompleted,
  }));
}

let bearerToken: string | null = null;

async function getAuthToken(clientId: string, clientSecret: string) {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  const options = {
    method: "POST",
  };

  const response = await fetch(url, options);
  const authDetails = await response.json();

  if (typeof authDetails.access_token !== "string") {
    throw new Error("[getAuthToken]: could not get auth token");
  }

  bearerToken = authDetails.access_token;
  return bearerToken;
}

async function getGames(gamesIds: Array<string>) {
  try {
    const token =
      bearerToken ??
      (await getAuthToken(TWITCH_IGDB_CLIENT_ID, TWITCH_IGDB_CLIENT_SECRET));

    if (!token) {
      throw new Error(`[getGame] could not get auth token`);
    }

    const url = `https://api.igdb.com/v4/games`;
    const options = {
      method: "POST",
      headers: {
        "Client-ID": TWITCH_IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: `
        fields name, cover;
        where id = (${gamesIds.join(", ")});`,
    };

    const response = await fetch(url, options);
    const result = await response.json();

    const coversUrl = `https://api.igdb.com/v4/covers`;
    const coversRequestOptions = {
      method: "POST",
      headers: {
        "Client-ID": TWITCH_IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: `
        fields game, image_id;
        where id = (${result.map((g: any) => g.cover).join(", ")});
      `,
    };

    const coversResponse = await fetch(coversUrl, coversRequestOptions);
    const coversResult = await coversResponse.json();

    const contentItems = result.map((g: any) => ({
      id: g.id.toString(),
      title: g.name,
      imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${coversResult.find((x: any) => x.game === g.id).image_id}.jpg`,
    }));

    return contentItems;
  } catch (error) {
    console.error((error as Error).message);
  }
}
