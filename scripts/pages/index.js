import { photographerTemplate } from '../templates/photographer.js';

export async function getPhotographers() {
  try {
    const response = await fetch('/data/photographers.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const datas = await response.json();
    return datas;
  } catch (error) {
    console.log('Erreur lors de la récupération des données:', error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

// Attend que le DOM soit entièrement chargé avant d'exécuter le script pour éviter des erreurs de manipulation d'éléments non encore disponibles.

document.addEventListener('DOMContentLoaded', () => {
  const photographersSection = document.querySelector('.photographer_section');
  if (photographersSection) {
    init();
  }
});
