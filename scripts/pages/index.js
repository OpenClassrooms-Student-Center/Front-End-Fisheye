// import { photographerTemplate } from '../templates/photographer.js';
async function getPhotographers() {
  // Récupération des photographes depuis le fichier JSON
  const reponse = await fetch('../../data/photographers.json');
  const photographers = await reponse.json();
  console.log(photographers);
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(
    '.photographers__section'
  );

  photographers.forEach((photographer) => {
    const photographerCard = photographerTemplate(photographer);
    const userCardDOM = photographerCard.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
