import { getPhotographers } from "./factories/apiProvider.js";
import { createHTML , buildGallery, buildPrice } from "./factories/builderPageProfil.js";

////////////////////////////////////////

// aller chercher tous les photographes du json
getPhotographers().then((res) => {
  const allPhotographers = res.photographers;
  const allMedias = res.media;
 

  //afficher tous les id des photographes du json
  allPhotographers.forEach((artist) => compare(artist, photographerId));
  //   return allPhotographers;
  //affiche tous les medias des photographes du json
  allMedias.forEach((pix) => findMedias(pix, photographerId));
});

let url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");

// Comparer l'id de la page avec les id des photographes
function compare(a, b) {
  if (a.id == b) {
    createHTML(a);
  }
}

function findMedias(a, b) {
  if (a.photographerId == b) {
    buildGallery(a)
    
  }
}
buildPrice()
getPhotographers();

