"use strict";
import { createPhotographer } from "./factories/photographer.js";



// Récupération du tableau des photographes
export function displayPhotographers(data) {
  const { dataPhotographers } = data;
  const photographersSection = document.querySelector(".photographers_section");
  // remplissage de la section "photographers_section" avec tous les photographes
  dataPhotographers.forEach((photographer) => {
    photographersSection.appendChild(createPhotographer(photographer));
  });
}
