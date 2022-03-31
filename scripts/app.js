"use strict";
import { displayPhotographers } from "./index.js";
import { getDataPhotographers } from "./api.js";
import { openSort } from "./dropdown.js";
import { displayPhotographerProfil } from "./photographer-profil.js";
import { contactModal } from "./modal.js";

(async function appRouter() {
  try {
    const DATA_FISHEYE = await getDataPhotographers();
    if (window.location.pathname.includes("/photographer.html")) {
      // Affichage Profil Photographe
      displayPhotographerProfil(DATA_FISHEYE);

      // Affichage Bouton dropdown
      openSort(DATA_FISHEYE);

      return;
    }
    // Affichage Page d'Accueil
    displayPhotographers(DATA_FISHEYE);
  } catch (err) {
    console.error("");
  }
})();
