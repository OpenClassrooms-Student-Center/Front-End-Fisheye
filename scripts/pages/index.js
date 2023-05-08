import { PhotographersApi } from '../api/api.js';

class IndexApp {
  constructor() {
    this.usersDataApi = new PhotographersApi("../data/photographers.json");
  }

  async displayData(photographers) {
    // Display photographers
    const photographersSection = document.querySelector(".photographers-index");
    photographers.forEach((photographer) => {
      const photographerModel = new PhotographerModel(photographer);
      photographersSection.append(photographerModel.getUserCardDOM());
    });
  };

  async init() {
    // Récupère les datas des photographes
    this.displayData(await this.usersDataApi.getPhotographerData());
  };
}

new IndexApp().init();
