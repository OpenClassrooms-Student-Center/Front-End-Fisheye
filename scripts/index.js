import { createPhotographer } from "./factories/photographer.js";
import { getDataPhotographers } from "./api.js";

// Récupération du tableau des photographes
export function displayPhotographers({ dataPhotographers }) {
  console.log({ dataPhotographers });
  const photographersSection = document.querySelector(".photographers_section");
  // remplissage de la section "photographers_section" avec tous les photographes
  dataPhotographers.forEach((photographer) => {
    photographersSection.appendChild(createPhotographer(photographer));
  });
}
// Création Page d'Accueil
displayPhotographers(await getDataPhotographers());
