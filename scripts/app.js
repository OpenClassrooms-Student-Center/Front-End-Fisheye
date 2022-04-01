"use strict";
import { displayPhotographers } from "./index.js";
import { getDataPhotographers } from "./api.js";
import { openSort } from "./dropdown.js";
import { displayPhotographerProfil } from "./photographer-profil.js";
import MediaBuilder from "./factories/media.js";
const mainContent = document.querySelector("#main-content");

(async function appRouter() {
  try {
    const DATA_FISHEYE = await getDataPhotographers();
    if (window.location.pathname.includes("/photographer.html")) {
      // Affichage Profil Photographe
      displayPhotographerProfil(DATA_FISHEYE);
      //affichage des medias de la galerie
      new MediaBuilder().photographersMedias(DATA_FISHEYE);
      // Affichage Bouton dropdown
      openSort(DATA_FISHEYE);

      return;
    }
    // Affichage Page d'Accueil
    displayPhotographers(DATA_FISHEYE);
  
  } catch (err) {
    console.error();
  }
})();
