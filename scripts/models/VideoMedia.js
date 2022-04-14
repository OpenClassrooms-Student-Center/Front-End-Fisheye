// eslint-disable-next-line no-unused-vars
class VideoMedia {
  constructor (mediaData, photographerFolder) {
    this.date = mediaData.date
    this.id = mediaData.id
    this.likes = mediaData.likes
    this.photographerId = mediaData.photographerId
    this.price = mediaData.price
    this.title = mediaData.title
    this.video = mediaData.video
    
    this.photographerFolder = photographerFolder
  }

  getMediaCardDOM () {
    return document.createRange().createContextualFragment(`
      <div class="mediaCard">
        <i class="fa-solid fa-video"></i>
        <video id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.video}">
        </video>
        <div class="mediaCard__infos">
          <p class="mediaCard__infos--title">
          ${this.title}
          </p>
          <p class="mediaCard__infos--likes">
          <span id="totalMedialikes--${this.id}">${this.likes}</span> <i id="likes--${this.id}" class="fa-regular fa-heart"></i>
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
    `)
  }
}
  