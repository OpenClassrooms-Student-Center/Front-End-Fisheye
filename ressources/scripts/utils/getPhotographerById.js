import { getPhotographers } from "../utils/fetchData.js";


// on récupère l'id passée en param dans l'url pour définir le photographe
export async function getPhotographersById() {
  const { photographers } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));

  const photographer = photographers.find(photographers => photographers.id === id);

  return photographer
}
