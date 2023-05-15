import { getPhotographers } from "./fetchData.js";

export async function getMediasByPhotographer() {
  const { media } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));

  return media.filter(media => media.photographerId === id)
}
