/* eslint-disable no-undef */
/* eslint-disable quotes */
// Fonction pour afficher chaque photographe suivant un template
async function displayData(photographers) {
  const $photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerInListTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    $photographersSection.appendChild(userCardDOM);
  });
}
// Fonction pour recupérer toute la liste des photographes
async function init() {
  const { photographers } = await fetchData("/data/photographers.json");
  displayData(photographers);
}

init();
