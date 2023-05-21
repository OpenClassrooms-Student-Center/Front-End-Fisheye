import { Api } from "../api/index.js";

export class MediaApi extends Api {
  static async getAllMedia() {
    const media = await this.get();
    return media;
  }

  static async getMediaByPhotographerId(id) {
    const allMedia = await this.getAllMedia();
    const mediaList = [];
    allMedia.medias.find((media) => {
      (media.photographerId == id) && mediaList.push(media);
    });
    return mediaList;
  }
}
