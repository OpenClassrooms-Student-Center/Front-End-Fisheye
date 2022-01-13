async function getPhotographers() {
  const data = await fetch("../../data/photographers.json");
  const jsonData = await data.json();
  const photographers = jsonData.photographers;
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerPreview();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
