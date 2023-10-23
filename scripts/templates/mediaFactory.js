/// // Factory method for medias

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

    const photographerName = this.#photographer.name.split(" ")[0];
    const imageMedia = `../../assets/medias/${photographerName}/${image}`;

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", imageMedia);
    imageElement.setAttribute("alt", title);
    imageElement.classList.add("media-img");
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
    const photographerName = this.#photographer.name.split(" ")[0];
    const videoMedia = `../../assets/medias/${photographerName}/${video}`;

    const videoDiv = document.createElement("video");
    videoDiv.classList.add("media-video");
    const videoElement = document.createElement("source");

    videoDiv.setAttribute("controls", "");
    videoElement.setAttribute("src", videoMedia);
    videoElement.setAttribute("type", "video/mp4");
    videoElement.setAttribute("control", "video/mp4");

    videoDiv.appendChild(videoElement);
    return videoDiv;
  }
}
