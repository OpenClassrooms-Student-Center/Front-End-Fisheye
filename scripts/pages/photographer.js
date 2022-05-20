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
  const photographerModel = photographerFactory(photographer);

  // display Header
  const photographerHeader = document.querySelector(".photograph-header");
  const contactButton = document.getElementById("contact");
  const headerDiv = document.createElement("div");
  headerDiv.innerHTML = `<h1>${photographerModel.name}</h1>
                        <h2>${photographerModel.city}, ${photographerModel.country}</h2>
                        <p>${photographerModel.tagline}</p>`;
  photographerHeader.appendChild(headerDiv);
  photographerHeader.insertBefore(headerDiv, contactButton);
  // TODO: display portrait img

  // display Media
}

async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const selectedPhotographer = await getSelectedPhotographer(photographerId);
  displaySelectedData(selectedPhotographer);
}

selectedInit();
