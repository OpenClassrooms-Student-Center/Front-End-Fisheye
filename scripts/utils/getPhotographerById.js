import { getPhotographers } from "./fetchData.js";

export async function getPhotographersById() {
  const { photographers } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));
  console.log(id)

  return photographers.find(photographers => photographers.id === id)
}