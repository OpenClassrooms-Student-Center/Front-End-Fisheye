import { getPhotographers } from "../utils/fetchData.js";

export async function getPhotographersById() {
  const { photographers } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));

  const photographer = photographers.find(photographers => photographers.id === id);

  return photographer
}
