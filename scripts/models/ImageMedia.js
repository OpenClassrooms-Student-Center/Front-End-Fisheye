/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class ImageMedia extends Media {
  constructor (mediaData, photographerFolder) {
    super(mediaData, photographerFolder)
    
    this.image = mediaData.image
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

  getSpecificDOM () {
    return `
      <img id="${this.id}" class="mediaCard__media open_lightbox" src="assets/images/${this.photographerFolder}/${this.image}" alt="${this.title}" />
    `
  }

  getSpecificLightboxDOM () {
    return `
      <img class="lightbox__media" src="assets/images/${this.photographerFolder}/${this.image}" alt="${this.title}"  />
    `
  }
}
