import { photographerCard } from '../templates/photographerCard.js';
import { initPhotograph } from './photographer.js';
// Récupération des photographes depuis le fichier JSON

async function getPhotographers() {
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
  initPhotograph();
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayPhotographers(photographers);
}

init();
