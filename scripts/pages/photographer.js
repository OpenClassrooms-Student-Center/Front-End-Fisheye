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
    this.lightboxWrapper = document.querySelector("#modal-wrapper");

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

  async lightbox(mediaId, index) {
    console.log("openLightbox called with mediaId:", mediaId);

    const photographer = await this.photographer();
    const media = await this.media();
    await this.mediasLightboxArray();
    const medias = mediasLightbox[index];

    const template = new Lightbox(media, medias, photographer);
    // const carouselControlPrev = document.getElementById("controls-left");

    this.lightboxWrapper.innerHTML = "";
    this.lightboxWrapper.appendChild(
      template.createLightbox(media, photographer, mediaId)
    );
  }
}

const initApp = async () => {
  const photographerPages = new PhotographerPages();
  await photographerPages.aboutPhotographer(); // Wait for aboutPhotographer to complete
  await photographerPages.mediasLightboxArray(); // Wait for mediasLightboxArray to complete
  await photographerPages.photographerWork(); // photographerWork doesn't seem to have any asynchronous operations
  await photographerPages.lightbox();
};
initApp();

export { PhotographerPages };
