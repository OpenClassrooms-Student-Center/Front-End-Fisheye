import { PhotographersApi } from "../api/api.js";
import { Photographer } from "../class/photographer.js";
import { PhotographerCard } from "../templates/photographer.js";

class App {
  constructor() {
    // Get data
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    // Get element
    this.photographersSection = document.querySelector(".photographer_section");
  }

  async main() {
    const photographersApiData = await this.photographersApi.getPhotographers();
    photographersApiData
      .map((photographer) => new Photographer(photographer))
      .forEach((photographer) => {
        const template = new PhotographerCard(photographer);
        this.photographersSection.appendChild(
          template.createPhotographerCard(photographer)
        );
      });
  }
}
const initApp = async () => {
  const app = new App();
  app.main();
};
initApp();
