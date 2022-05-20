async function getPhotographers() {
  const url = "/data/photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  return { photographers: data.photographers };
}

async function getSelectedPhotographer(id) {
  const { photographers } = await getPhotographers();
  const selectedPhotographer = photographers.find(
    (photographer) => photographer.id === id
  );
  return selectedPhotographer;
}

function displaySelectedData(photographer) {
  const photographerModel = photographerFactory(photographer);

  // display Header
  const photographerHeader = document.querySelector(".photograph-header");
  const contactButton = document.getElementById("contact");
  const headerDiv = document.createElement("div");
  const portrait = document.createElement("img");

  portrait.setAttribute(
    "src",
    `assets/photographers/${photographerModel.portrait}`
  );
  portrait.classList.add("portrait");

  headerDiv.innerHTML = `<h2>${photographerModel.name}</h2>
                        <h3>${photographerModel.city}, ${photographerModel.country}</h3>
                        <p>${photographerModel.tagline}</p>`;
  photographerHeader.appendChild(headerDiv);
  photographerHeader.insertBefore(headerDiv, contactButton);
  photographerHeader.appendChild(portrait);
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
