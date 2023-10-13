/// // Factory method for medias

class Media {
  #media;
  #photographer;

  constructor(media, photographer) {
    this.#media = media;
    this.#photographer = photographer;
  }

  getMediaCardDom() {

    if (this.#media.video) {
      new Video(this.#media, this.#photographer).getMediaCardDom();
    } else {
      new Image(this.#media, this.#photographer).getMediaCardDom();
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

  /*imageMediaTemplate(mainTemplate) {
    const { photographerId, image, title } = this.#media;

    switch (pId) {
      case '243':
        photographerName = 'Mimi';
        break;
      case '930':
        photographerName = 'Ellie Rose';
        break;
      case '82':
        photographerName = 'Tracy';
        break;
      case '527':
        photographerName = 'Nabeel';
        break;
      case '925':
        photographerName = 'Rhode';
        break;
      case '195':
        photographerName = 'Marcel';
        break;
      default:
        alert('photographer missing');
    }

    const imageMedia = `assets/medias/${this.#photographer}/${image}`;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageMedia);
    imageElement.setAttribute('alt', title);

    mainTemplate.appendChild(imageElement);

    return mainTemplate;
  }*/

  getMediaCardDom() {

    const sectionMedia = document.querySelector('.media');
    const mediaTemplate = mediaTemplate();

    sectionMedia.appendChild(mediaTemplate);

  }}


class Video {
  #media;

  #photographer;

  constructor(media, photographer) {
    this.#media = media;
    this.#photographer = photographer;
  }

  /*videoMediaTemplate() {

    const { photographerId, video } = this.#media;
    const pId = photographerId;
    let photographerName;

    switch (pId) {
      case '243':
        photographerName = 'Mimi';
        break;
      case '930':
        photographerName = 'Ellie Rose';
        break;
      case '82':
        photographerName = 'Tracy';
        break;
      case '527':
        photographerName = 'Nabeel';
        break;
      case '925':
        photographerName = 'Rhode';
        break;
      case '195':
        photographerName = 'Marcel';
        break;
      default:
        alert('photographer missing');
  
  }*/

  getMediaCardDom() {
    const sectionMedia = document.querySelector('.media');
    sectionMedia.appendChild(mediaTemplate);
  }
}
