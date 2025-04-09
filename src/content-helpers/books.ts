// todo - ts support for JSON
export async function bookLoader(booksJson: any) {
  const promises = booksJson.map((b: any) => getBook(b.isbn));
  const books = await Promise.all(promises);

  return books.map((b, i) => ({
    ...b,
    id: b?.id ?? crypto.randomUUID(),
    dateFinished: booksJson[i].dateFinished,
  }));
}

export async function getBook(isbn: string) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[getBook] Could not get book: ${isbn}`);
    }

    const searchResults = await response.json();

    if (
      !Array.isArray(searchResults.items) ||
      searchResults.items.length === 0
    ) {
      throw new Error(`[getBook] Could not get book: ${isbn}`);
    }

    const {
      volumeInfo: {
        id,
        title,
        subtitle,
        authors,
        imageLinks: { thumbnail },
      },
      searchInfo: { textSnippet },
    } = searchResults.items[0];

    // todo - Zod it up
    return {
      id,
      title,
      authors,
      description: textSnippet,
      thumbnailSrc: thumbnail,
    };
  } catch (error) {
    console.error((error as Error).message);
  }
}
