async function getPhotographers() {
  // Retourne le tableau de photographes
  const photographerApi = new PhotographerApi("/data/photographers.json");
  return photographerApi.get();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();

  // Affiche les données des photographes
  displayData(photographers);
}

init();
