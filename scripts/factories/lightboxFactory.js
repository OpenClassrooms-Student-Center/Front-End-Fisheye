import { LightboxImg } from "../components/lightbox/LightboxImg.js";
import { LightboxVideo } from "../components/lightbox/LightboxVideo.js";

export class LightboxFactory {

  /**
   * @param {string}extension 
   * @param {string} mediaLink
   * @param {string} title
   */
  constructor(extension, mediaLink, title) {
    switch (extension) {
      case "jpg":
        return new LightboxImg(mediaLink, title);
      case "mp4":
        return new LightboxVideo(mediaLink, title);
    }
  }
}
