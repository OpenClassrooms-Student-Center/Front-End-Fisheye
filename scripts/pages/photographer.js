import { PhotographersApi } from '../api/api.js';

class PhotographerApp {
  constructor() {
    this.usersDataApi = new PhotographersApi("../data/photographers.json");
  }

  async displayData(photographer) {
    // Display data photographer
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new PhotographerModel(photographer);
    photographerHeader.append(photographerModel.getPhotographerInfos());

    const photographerBody = document.querySelector(".media-section");
    const photographerMediasModel = new MediaModel(photographer);
    photographerBody.append(photographerMediasModel.createMediaCard());
  };

  async init() {
    // Retrieves data from the photographer
    const photographerData = await this.usersDataApi.getPhotographerPages();
    this.displayData(photographerData);
  };
}

new PhotographerApp().init();
