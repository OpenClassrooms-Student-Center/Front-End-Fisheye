//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
let photographerId = params.get("id");
console.log(photographerId);

async function getPhotographer() {
  const data = await (await fetch("../../data/photographers.json")).json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == photographerId
  );

  return photographer;
}

async function displayData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");
  const photographerModel = photographerFactory(photographer);
  const photographerInfos = photographerModel.getPhotographerInfoDOM();
  photographerHeader.insertBefore(photographerInfos, contactButton);

  const photographerImage = document.createElement("img");
  photographerImage.setAttribute("src", photographerModel.picture);
  photographerImage.setAttribute("alt", `photo de ${photographerModel.name}`);

  photographerHeader.appendChild(photographerImage);
}

async function init() {
  const photographer = await getPhotographer();
  displayData(photographer);
}

init();
