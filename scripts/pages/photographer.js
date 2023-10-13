import { MediasApi } from "../api/api.js";
// import {
//   photographerPageTemplate,
//   photographerMediaTemplate,
// } from "../templates/photographerPage.js";
import { PhotographersApi } from "../api/api.js";
import { Media } from "../class/media.js";
import { Photographer } from "../class/photographer.js";
import { AboutPhotographer } from "../templates/aboutPhotographer.js";
import { PhotographerWork } from "../templates/photographerWork.js";

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");

class PhotographerPages {
  constructor() {
    this.aboutPhotographerWrapper =
      document.querySelector("#photograph-header");

    this.photographerWorkWrapper = document.querySelector("#medias-wrapper");

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
      // console.log(photographerDataFiltered);
      return photographerDataFiltered;
    };

    this.media = async () => {
      const mediasData = await this.mediasApi.getMedias();
      mediasData.map((media) => new Media(media));
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
  // Render photographerWork
  async photographerWork() {
    const photographer = await this.photographer();
    const media = await this.media();
    const template = new PhotographerWork(photographer, media);
    this.photographerWorkWrapper.appendChild(
      template.createPhotographerWork(photographer, media)
    );
  }
}

const initApp = async () => {
  const photographerPages = new PhotographerPages();
  await photographerPages.aboutPhotographer();
  await photographerPages.photographerWork();
};
initApp();

export { PhotographerPages };
