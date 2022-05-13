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
  return selectedPhotographer;
}

async function displaySelectedData(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographer);
  photographersHeader.innerHTML = `<h1>${photographerModel.name}</h1>`;
}

async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const selectedPhotographer = await getSelectedPhotographer(photographerId);
  displaySelectedData(selectedPhotographer);
}

selectedInit();
