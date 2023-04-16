async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const photographerCard = photographerModel.getPhotographerCard();
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
