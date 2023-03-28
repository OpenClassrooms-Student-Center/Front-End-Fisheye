async function getPhotographers() {
  let photographers = []; // On crée un tableau vide pour les photographes

  const response = await fetch("../data/photographers.json"); // On récupère le fichier JSON

  photographers = await response.json(); // On récupère le contenu du fichier JSON

  console.log(photographers.photographers); // On affiche le contenu du tableau photographers

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: photographers.photographers // On retourne le tableau photographers
  };
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
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
