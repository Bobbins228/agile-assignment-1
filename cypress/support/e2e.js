export const filterByName = (actors, string) =>
  actors.filter((a) => a.name.toLowerCase().search(string) !== -1);