import { MediaApi } from '../api/mediaApi.js';
import { PhotographerApi } from '../api/photographerApi.js';
import { MediaFactory } from "../factories/media_factory.js";
import { PhotographerModel } from "../models/photographer.js";

class PhotographerApp {
  constructor() {
    this.currentUrl = new URL(document.location.href).searchParams;
    this.id = this.currentUrl.get("id");
  }

  displayData(photographer, mediaList) {
    // Display data photographer
    console.log('info :', photographer, mediaList)
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerMedia = document.querySelector(".media-section");

    const photographerModel = new PhotographerModel(photographer);

    photographerHeader.append(photographerModel.getPhotographerInfos());

    // const photographerMediasModel = new MediaFactory(mediaList);
    // photographerMedia.append(photographerMediasModel.getMediaCardDOM());

    mediaList.map(media => {
      const photographerMediasModel = new MediaFactory(media);
      photographerMediasModel.getMediaCardDOM(photographerMedia);
    });
  };

  async init() {
    const media = await MediaApi.getMediaByPhotographerId(this.id);
    const photographer = await PhotographerApi.getPhotographerById(this.id);
    this.displayData(photographer, media);
  }
}

new PhotographerApp().init();
