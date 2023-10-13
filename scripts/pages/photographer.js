import { MediasApi } from "../api/api.js";
// import {
//   photographerPageTemplate,
//   photographerMediaTemplate,
// } from "../templates/photographerPage.js";
import { PhotographersApi } from "../api/api.js";
import { Photographer } from "../class/photographer.js";
import { AboutPhotographer } from "../templates/aboutPhotographer.js";

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");

class PhotographerPages {
  constructor() {
    this.aboutPhotographerWrapper =
      document.querySelector("#photograph-header");

    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
    this.mediasApi = new MediasApi("../../data/photographers.json");

    this.photographer = async () => {
      const photographerData = await this.photographersApi.getPhotographers();
      photographerData.map((photographer) => new Photographer(photographer));
      const photographerDataFiltered = photographerData.find(
        (photographer) => photographer.id == id
      );
      console.log(photographerDataFiltered);
      return photographerDataFiltered;
    };

    this.media = async () => {
      const mediasData = await this.mediasApi.getMedias();
      mediasData.map((media) => new MediasFactory(media));
      const mediasDataFiltered = mediasData.filter(
        (photographer) => photographer.photographerId == id
      );
      return mediasDataFiltered;
    };
  }
  // Render aboutPhotographer
  async aboutPhotographer() {
    const photographer = await this.photographer();
    const template = new AboutPhotographer(photographer);
    this.aboutPhotographerWrapper.appendChild(
      template.createAboutPhotographer(photographer)
    );
  }
}

const initApp = async () => {
  const photographerPages = new PhotographerPages();
  await photographerPages.aboutPhotographer();
};
initApp();

export { PhotographerPages };
