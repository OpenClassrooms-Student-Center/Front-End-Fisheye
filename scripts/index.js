"use strict";
import { createPhotographer } from "./factories/photographer.js";
import { getDataPhotographers } from "./api.js";
import { openSort } from "./dropdown.js";

// Récupération du tableau des photographes
export function displayPhotographers(data) {
  const { dataPhotographers } = data;
  const photographersSection = document.querySelector(".photographers_section");
  // remplissage de la section "photographers_section" avec tous les photographes
  dataPhotographers.forEach((photographer) => {
    photographersSection.appendChild(createPhotographer(photographer));
  });
}
// Création Page d'Accueil
displayPhotographers(await getDataPhotographers());
await openSort();
