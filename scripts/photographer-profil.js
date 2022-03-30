// Création Profil Photographe
"use strict";
import { getDataPhotographers } from "./api.js";

export async function displayPhotographerProfil(dataFisheye) {
  const PHOTOGRAPHERS_DATA = dataFisheye.dataPhotographers;
  //recuperation de la valeur de ID dans l'URL
  const ID = window.location.search.substring(1).split("=")[1];

  /*DEUXIEME METHODE
  let searchParam = new URLSearchParams(window.location.search);
  const ID = searchParam.get("id");*/
  const PHOTOGRAPHERS = PHOTOGRAPHERS_DATA.filter(
    (photographer) => photographer.id == ID
  );
  console.log(PHOTOGRAPHERS);
  const photographerProfileArticle =
    document.getElementById("ph-profil-header");
  const templatePhotographerProfil = `
            <article  class="ph-profil">
                <div class='ph-infos'>
                    <h2>${PHOTOGRAPHERS[0].name}</h2>
                    <p class="ph-city">${PHOTOGRAPHERS[0].city}, ${PHOTOGRAPHERS[0].country}</p>
                    <p class="ph-tagline">${PHOTOGRAPHERS[0].tagline}</p>
                </div>
                <button id="btn-contact" >Contactez-moi</button>
                <a href='#'><img src="./assets/Photographers/${PHOTOGRAPHERS[0].portrait}" alt="${PHOTOGRAPHERS[0].alt}"></a>
            </article>
            `;

  photographerProfileArticle.innerHTML = templatePhotographerProfil;
}

