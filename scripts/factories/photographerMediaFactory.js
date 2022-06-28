import {
  MediaImg,
  MediaVideo,
} from "../components/photographerMedias/index.js";

export class MediasFactory {
  /**
   * @param {Object} media
   * @param {string} photographeName
   * @returns {Object} MediaVideo || MediaImage
   */
  constructor(media, photographeName) {
    if (media.image == undefined) {
      return new MediaVideo(media, photographeName);
    } else {
      return new MediaImg(media, photographeName);
    }
  }
}
