export const getDateString = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
