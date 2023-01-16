export function makeImagePath(id: string, format?: string) {
  const IMG_BASE_PATH = "https://image.tmdb.org/t/p/";
  return `${IMG_BASE_PATH}${format ? format : "original"}/${id}`;
}
