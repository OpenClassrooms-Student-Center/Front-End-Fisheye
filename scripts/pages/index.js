import { PhotographersApi } from "../api/api.js";
import { photographerTemplate } from "../templates/photographer.js";

class App {
  constructor() {
    // this.$moviesWrapper = document.querySelector(".movies-wrapper");

    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async main() {
    const photographersApiData = await this.photographersApi.getPhotographers();

    photographersApiData.forEach((photographer) => {
      displayPhotographerData(photographer);
    });

    async function displayPhotographerData(photographer) {
      console.log("photographer", photographer);
      //création de la section photographes
      const photographersSection = document.querySelector(
        ".photographer_section"
      );
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();

      //ajout des éléments à la classe "photographer_section"
      photographersSection.appendChild(userCardDOM);
    }

    async function init() {
      // Récupère les datas des photographes
      try {
        const photographers = await getPhotographers();
        displayPhotographerData(photographers);
        console.log(photographers);
      } catch (error) {
        console.error("Error fetching photographers data:", error);
      }
    }

    init();
  }

  //------------------------------------------------------------------------
}

//------------------------------------------------------------------------

const app = new App();
app.main();
