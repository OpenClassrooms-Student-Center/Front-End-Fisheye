import { PhotographerApi } from "../api/photographerApi.js";
import { PhotographerModel } from "../models/photographer.js";

class IndexApp {
  async displayData(photographers) {
    // Display photographers
    const photographersSection = document.querySelector(".photographers-index");
    photographers.photographers.map((photographer) => {
      const photographerModel = new PhotographerModel(photographer);
      photographersSection.append(photographerModel.getUserCardDOM());
    });
  };

  async init() {
    // Get photographers Datas
    this.displayData(await PhotographerApi.getPhotographers());
  };
}

new IndexApp().init();
