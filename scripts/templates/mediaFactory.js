/// // Factory method for medias
import { getPhotographersMedia } from "./photographer.js";

export class Media {
  #media;
  #photographer;

  constructor(media, photographer) {
    this.#media = media;
    this.#photographer = photographer;
  }

  getMediaCardDom() {
    if (this.#media.video) {
      return new Video(this.#media, this.#photographer).getMediaCardDom();
    } else {
      return new Image(this.#media, this.#photographer).getMediaCardDom();
    }
  }
}

class Image {
  #media;
  #photographer;

  constructor(media, photographer) {
    this.#media = media;
    this.#photographer = photographer;
  }

  getMediaCardDom() {
    const { title, image } = this.#media;

    const photographerName = getPhotographersMedia(this.#photographer);
    const imageMedia = `../../assets/medias/${photographerName}/${image}`;

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", imageMedia);
    imageElement.setAttribute("alt", title);
    return imageElement;
  }
}

class Video {
  #media;
  #photographer;

  constructor(media, photographer) {
    this.#media = media;
    this.#photographer = photographer;
  }

  getMediaCardDom() {
    const { video } = this.#media;
    const photographerName = getPhotographersMedia(this.#photographer);
    const videoMedia = `../../assets/medias/${photographerName}/${video}`;

    const videoDiv = document.createElement("video");
    const videoElement = document.createElement("source");

    videoElement.setAttribute("src", videoMedia);
    videoElement.setAttribute("type", "video/mp4");
    // Voir accessibilité vidéos et attribut control

    videoDiv.appendChild(videoElement);
    return videoDiv;
  }
}
