import { MediasApi } from "../api/api.js";
import { PhotographersApi } from "../api/api.js";
import { Media } from "../class/media.js";
import { Photographer } from "../class/photographer.js";
import { AboutPhotographer } from "../templates/aboutPhotographer.js";
import { Lightbox } from "../templates/lightbox.js";
import { PhotographerWork } from "../templates/photographerWork.js";

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");

// Create mediasLightbox array
let mediasLightbox = [];

class PhotographerPages {
  constructor() {
    this.aboutPhotographerWrapper =
      document.querySelector("#photograph-header");

    this.photographerWorkWrapper = document.querySelector("#medias-wrapper");
    this.lightboxWrapper = document.querySelector("#modal-content");

    // this.lightboxWrapper = document.querySelector("#test");

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

    // this.lightbox = async () => {
    //   const lightboxData = await this.mediasApi.getMedias();
    //   lightboxData.map((media) => new Lightbox(media));
    //   const lightboxDataFiltered = lightboxData.filter(
    //     (photographer) => photographer.photographerId == id
    //   );
    //   return lightboxDataFiltered;
    // };
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

  // Fill mediasLightbox array (for lightbox)
  async mediasLightboxArray() {
    const mediasData = await this.media();
    mediasLightbox = mediasData.filter(
      (photographer) => photographer.photographerId == id
    );
  }

  async lightbox() {
    const photographer = await this.photographer();
    var medias = mediasLightbox.filter((objet) => objet.photographerId == id);

    medias.forEach((media) => {
      const template = new Lightbox(media, photographer);
      const carouselControlPrev = document.getElementById("controls-left");
      this.lightboxWrapper.insertBefore(
        template.createLightbox(media, photographer),
        carouselControlPrev
      );
    });
  }
}

const initApp = async () => {
  const photographerPages = new PhotographerPages();
  photographerPages.aboutPhotographer();
  await photographerPages.mediasLightboxArray();
  photographerPages.photographerWork();
  photographerPages.lightbox();
};
initApp();

export { PhotographerPages };
