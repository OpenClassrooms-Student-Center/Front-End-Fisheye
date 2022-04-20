/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class ImageMedia extends Media {
  constructor (mediaData, photographerFolder) {
    super(mediaData, photographerFolder)
    
    this.image = mediaData.image
  }

  getMediaCardDOM () {
    const heartValue = this.isLiked ? 'fa-solid' : 'fa-regular'
    return document.createRange().createContextualFragment(`
    <div class="mediaCard" id="mediaCard--${this.id}">
      <img id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.image}" />
        <div class="mediaCard__infos">
          <p class="mediaCard__infos--title">
          ${this.title}
          </p>
          <p class="mediaCard__infos--likes">
            <span id="totalMedialikes--${this.id}">${this.likes}</span> <i id="likes--${this.id}" class="${heartValue} fa-heart"></i>
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
