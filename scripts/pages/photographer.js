async function getPhotographers() {
  const url = "/data/photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  return { photographers: data.photographers };
}

async function getSelectedPhotographer(id) {
  const data = await getPhotographers();
  const selectedPhotographer = data.photographers.filter(
    (photographer) => photographer.id === id
  )[0];
  console.log(selectedPhotographer.name);
  return selectedPhotographer;
}

const params = new URL(document.location).searchParams;
const photographerId = parseInt(params.get("id"));

getSelectedPhotographer(photographerId);
