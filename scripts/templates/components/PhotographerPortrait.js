export class PhotographerPortrait {
  constructor(photographer) {
    this.photographer = photographer
  }

  createPortrait(wrapper) {
const photographerPicture = document.createElement("img")
    photographerPicture.classList = "photographer-portrait"
    photographerPicture.setAttribute(
      "src",
      `assets/photographers/${this.photographer.portrait}`
    )
    photographerPicture.alt = `${this.photographer.name}`
    wrapper.appendChild(photographerPicture)
  return wrapper}

}