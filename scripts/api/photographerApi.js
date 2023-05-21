import { Api } from "../api/index.js";

export class PhotographerApi extends Api {
  static async getPhotographers() {
    return await this.get();
  }

  static async getPhotographerById(id) {
    const photographers = await this.getPhotographers();
    return photographers.photographers.find((photographer) => photographer.id == id);
  }
}
