import { PhotographersApi } from "../api/api.js";

class App {
  constructor() {
    // this.$moviesWrapper = document.querySelector(".movies-wrapper");

    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async main() {
    const photographersApiData = await this.photographersApi.getPhotographers();

    console.log("photographersApiData", photographersApiData);

    photographersApiData.forEach((photographer) => {
      console.log(photographer);

      // const photographerModel = photographerTemplate(photographer);
      // const userCardDOM = photographerModel.getUserCardDOM();
      // //ajout des éléments à la classe "photographer_section"
      // photographersSection.appendChild(userCardDOM);
    });

    async function displayPhotographerData(photographersApiData) {
      console.log("photographersArray", photographersApiData);
      //création de la section photographes
      const photographersSection = document.querySelector(
        ".photographer_section"
      );

      //boucle sur le json
      photographersApiData.forEach((element) => console.log(element));
      photographersApiData.forEach((photographer) => {
        console.log(1);
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        //ajout des éléments à la classe "photographer_section"
        photographersSection.appendChild(userCardDOM);
      });
    }

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
  }

  //------------------------------------------------------------------------
}

//------------------------------------------------------------------------

const app = new App();
app.main();
