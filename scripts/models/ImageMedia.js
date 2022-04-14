// eslint-disable-next-line no-unused-vars
class ImageMedia {
  constructor (mediaData, photographerFolder) {
    this.date = mediaData.date
    this.id = mediaData.id
    this.image = mediaData.image
    this.likes = mediaData.likes
    this.photographerId = mediaData.photographerId
    this.price = mediaData.price
    this.title = mediaData.title
    
    this.photographerFolder = photographerFolder
  }

  getMediaCardDOM () {
    return document.createRange().createContextualFragment(`
      <div class="mediaCard open_lightbox">
        <img id="${this.id}" class="mediaCard__media" src="assets/images/${this.photographerFolder}/${this.image}" />
        <div class="mediaCard__infos">
          <p class="mediaCard__infos--title">
          ${this.title}
          </p>
          <p class="mediaCard__infos--likes">
            ${this.likes} <i class="fa-solid fa-heart"></i>
          </p>
        </div>
      </div>
    `)
  }

  getMediaLightboxDOM () {
    return document.createRange().createContextualFragment(`
      <div class="lightbox__mediaContent">
        <img class="lightbox__media" src="assets/images/${this.photographerFolder}/${this.image}" />
      </div>
      <div class="lightbox__mediaTitle">
        <h2>${this.title}</h2>
      </div>
    `)
  }
}
