export const filterByName = (actors, string) =>
  actors.filter((a) => a.name.toLowerCase().search(string) !== -1);

export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));