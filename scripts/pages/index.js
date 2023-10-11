import { PhotographersApi } from "../api/api.js";

class App {
  constructor() {
    // this.$moviesWrapper = document.querySelector(".movies-wrapper");

    this.photographersApi = new PhotographersApi("/data/photographers.json");
    console.log("photographersApi", this.photographersApi);
  }

  async main() {
    const photographersApiData = await this.photographersApi.getPhotographers();
    console.log("photographersApiData", photographersApiData);
  }
}

const app = new App();
app.main();

// async function getPhotographers() {
//   //récupération des photographes
//   const photographersResponse = await fetch("data/photographers.json");
//   const photographersData = await photographersResponse.json();

//   return photographersData;
// }
// getPhotographers();

// async function displayPhotographerData(photographersData) {
//   console.log("photographersArray", photographersData);
//   //création de la section photographes
//   const photographersSection = document.querySelector(".photographer_section");

//   //boucle sur le json
//   photographersData.photographers.forEach((photographer) => {
//     const photographerModel = photographerTemplate(photographer);
//     const userCardDOM = photographerModel.getUserCardDOM();

//     //ajout des éléments à la classe "photographer_section"
//     photographersSection.appendChild(userCardDOM);
//   });
// }

// async function init() {
//   // Récupère les datas des photographes
//   try {
//     const photographers = await getPhotographers();
//     displayPhotographerData(photographers);
//     console.log(photographers);
//   } catch (error) {
//     console.error("Error fetching photographers data:", error);
//   }
// }

// init();
