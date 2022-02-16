import { getPhotographers } from "./factories/apiProvider.js";
import { createHTML }  from "./factories/builderPageProfil.js";

////////////////////////////////////////

// aller chercher tous les photographes du json
getPhotographers().then((res) => {
  const allPhotographers = res.photographers;
  console.log(allPhotographers);

  //afficher tous les id des photographes du json
  allPhotographers.forEach((artist) => compare(artist, photographerId))
  return allPhotographers;
});

let url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");
console.log(photographerId);

// Comparer l'id de la page avec les id des photographes
function compare(a, b) {
  if (a.id == b) {
    createHTML(a);
    
    
  }
}

getPhotographers()
