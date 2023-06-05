export async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const datas = await response.json();
  const { photographers, media} = datas
  return { photographers, media };
}
