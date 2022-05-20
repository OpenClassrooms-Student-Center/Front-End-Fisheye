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
  // display Header
  function displayHeader() {
    const photographerModel = photographerFactory(photographer);
    const photographerHeader = document.querySelector(".photograph-header");
    const contactButton = document.getElementById("contact");
    const headerDiv = document.createElement("div");
    const portrait = document.createElement("img");

    headerDiv.innerHTML = `<h1>${photographerModel.name}</h1>
    <h2>${photographerModel.city}, ${photographerModel.country}</h2>
    <p>${photographerModel.tagline}</p>`;
    photographerHeader.appendChild(headerDiv);
    photographerHeader.insertBefore(headerDiv, contactButton);

    portrait.setAttribute(
      "src",
      `assets/photographers/${photographerModel.portrait}`
    );
    portrait.classList.add("portrait");
    photographerHeader.appendChild(portrait);
  }

  // display Media

  // display data
  displayHeader();
  // displaySelectMenu();
}

async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const selectedPhotographer = await getSelectedPhotographer(photographerId);
  displaySelectedData(selectedPhotographer);
}

selectedInit();
