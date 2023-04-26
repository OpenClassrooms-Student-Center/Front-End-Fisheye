import { PhotographersApi } from '../api/api.js';

class IndexApp {
  constructor() {
    this.usersDataApi = new PhotographersApi("../data/photographers.json");
  }

  async displayData(photographers) {
    // Display photographers
    const photographersSection = document.querySelector("#photographer_section");
    console.log("aaaa", photographersSection)
    photographers.forEach((photographer) => {
      const photographerModel = new PhotographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM.article);
    });
  };

  async init() {
    // Récupère les datas des photographes
    const photographerData = await this.usersDataApi.getPhotographerData();
    this.displayData(photographerData);
  };
}

const launchApp = new IndexApp();
launchApp.init()
