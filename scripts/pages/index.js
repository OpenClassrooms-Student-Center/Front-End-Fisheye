import DataObject from "./dataJson.js";
import photographerTemplate from "../templates/photoTemplate.js";
//  async function getPhotographers() {
//     //   importation des donnes json
// //importation des donnes json
// const reponse = await fetch('data/photographers.json');
// const data=await reponse.json();

//         return (data);

//     }
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.setAttribute(`role`, `navigation`);

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
// Fonction asynchrone pour attendre l'exécution de getPhotographers
async function init() {
  // APRES AVOIR ATTENDU L EXECUTION DE LA FONCTION ASYNCHRONE!!!!!

  // Récupère les datas des photographes

  const data = await new DataObject().getPhotoMedia();

  const { photographers, media } = data;

  // recupération des datas (photographes+media)

  console.log(photographers);

  displayData(photographers);
}

init();
