/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class VideoMedia  extends Media {
  constructor (mediaData, photographerFolder) {
    super(mediaData, photographerFolder)
    
    this.video = mediaData.video
  }

  getMediaCardDOM () {
    const heartValue = this.isLiked ? 'fa-solid' : 'fa-regular'
    return document.createRange().createContextualFragment(`
      <div class="mediaCard" id="mediaCard--${this.id}">
        <i class="fa-solid fa-video"></i>
        <video id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.video}">
        </video>
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
        <video 
          class="lightbox__media"
          controls
          src="assets/images/${this.photographerFolder}/${this.video}">
        </video>
      </div>
      <div class="lightbox__mediaTitle">
        <h2>${this.title}</h2>
      </div>
    `)
  }
}
  