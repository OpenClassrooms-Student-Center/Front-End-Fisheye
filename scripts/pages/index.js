import { photographerCard } from '../templates/photographerCard.js';

async function getPhotographers() {
  // Récupération des photographes depuis le fichier JSON
  const reponse = await fetch('../../data/photographers.json');
  const photographers = await reponse.json();
  console.log(photographers);
  return photographers;
}

async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(
    '.photographers__section'
  );
  photographers.forEach((photographer) => {
    const card = photographerCard(photographer);
    const cardDOM = card.getPhotographerCard();
    photographersSection.appendChild(cardDOM);
    console.log(photographer.id);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayPhotographers(photographers);
}

init();
