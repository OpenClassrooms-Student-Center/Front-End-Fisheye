import { PhotographersApi } from '../api/api.js';

class PhotographerApp {
  constructor() {
    this.usersDataApi = new PhotographersApi("../data/photographers.json")
  }

  async displayData(photographer) {
    // Data displaying
    const photographerHeader = document.querySelector("#photographer_header");
    console.log('aaa', photographerHeader);
    const photographerModel = new PhotographerFactory(photographer);
    const photographerInfos = photographerModel.getPhotographerInfos();
    photographerHeader.appendChild(photographerInfos.article);
  };

  async init() {
    // Retrieves data from the photographer
    const photographerData = await this.usersDataApi.getPhotographerBanner();
    this.displayData(photographerData);
  };
}

const launchApp = new PhotographerApp();
launchApp.init()
