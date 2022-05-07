/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class ImageMedia extends Media {
  constructor (mediaData, photographerFolder) {
    super(mediaData, photographerFolder)
    
    this.image = mediaData.image
  }

  getSpecificDOM () {
    return `
      <img id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.image}" alt="${this.title}" />
    `
  }

  getSpecificLightboxDOM () {
    return `
      <img class="lightbox__media" src="assets/images/${this.photographerFolder}/${this.image}" alt="${this.title}" />
    `
  }
}
