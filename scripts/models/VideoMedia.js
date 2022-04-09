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
        <video class="mediaCard__media" src="assets/images/${this.photographerFolder}/${this.video}">
        </video>
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
}
  