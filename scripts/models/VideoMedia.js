/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class VideoMedia  extends Media {
  constructor (mediaData, photographerFolder) {
    super(mediaData, photographerFolder)
    
    this.video = mediaData.video
  }

  getSpecificDOM () {
    return `
      <i class="fa-solid fa-video"></i>
      <video id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.video}">
      </video>
    `
  }

  getSpecificLightboxDOM () {
    return `
      <video 
        class="lightbox__media"
        controls
        src="assets/images/${this.photographerFolder}/${this.video}">
      </video>
    `
  }
}
  