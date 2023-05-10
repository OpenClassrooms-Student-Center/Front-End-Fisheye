export async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const photographers = await response.json();

  return photographers;
}
