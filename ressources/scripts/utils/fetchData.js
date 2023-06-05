export async function getPhotographers() {
  // const response = await fetch("../ressources/data/photographers.json");
  // const datas = await response.json();
  // const { photographers, media} = datas
  // return { photographers, media };
  try {
    const response = await fetch("../ressources/data/photographers.json");
    const result = await response.json();
    const { photographers, media} = result;
    return { photographers, media };
  } catch (error) {
    console.error("Error:", error);
  }
}
