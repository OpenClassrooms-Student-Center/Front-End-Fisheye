"use strict";
import { displayPhotographers } from "./index.js";
import { getDataPhotographers } from "./api.js";
import DropdownSort from "./dropdown.js";
import { displayPhotographerProfil } from "./photographer-profil.js";
import GaleryBuilder from "./galerieBuild.js";

async function app() {
  try {
    const DATA_FISHEYE = await getDataPhotographers();
    if (window.location.pathname.includes("/photographer.html")) {
      // Affichage Profil Photographe
      displayPhotographerProfil(DATA_FISHEYE);
      //affichage des medias de la galerie
      new GaleryBuilder().photographersMedias(DATA_FISHEYE);
      // Affichage Bouton dropdown
      new DropdownSort().Dropdown(DATA_FISHEYE);

      return;
    }
    // Affichage Page d'Accueil
    displayPhotographers(DATA_FISHEYE);
  } catch (err) {
    console.log(err);
  }
}
app();
