import { PhotographerPortrait } from "../components/PhotographerPortrait.js"

export class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer
  }

  // Create photographer cards displayed on main page
  createPhotographerCard() {
    const cardContainer = document.createElement("article")
    const cardLink = document.createElement("a")
    cardContainer.appendChild(cardLink)
    cardLink.href = `photographer.html?id=${this.photographer.id}`
    cardLink.ariaLabel = this.photographer.name
    this.createCardUpperPart(cardLink)
    this.createCardDescription(cardContainer)
    return cardContainer
  }

  // Create the upper part of the cards, containing the photo and name of the photographer :
  createCardUpperPart(container) {
    const photographerPicture = new PhotographerPortrait(this.photographer)
    photographerPicture.createPortrait(container)
    const photographerName = document.createElement("h2")
    photographerName.textContent = this.photographer.name
    photographerName.classList = "photographer-name"

    container.appendChild(photographerName)
  }

  // Create the lower part of the cards, containing the location, tagline and price of each photographer
  createCardDescription(container) {
    const photographerInfos = {
      location: `${this.photographer.location}`,
      tagline: `${this.photographer.tagline}`,
      price: `${this.photographer.price}€/jour`,
    }
    for (let [key, value] of Object.entries(photographerInfos)) {
      const newElement = document.createElement("p")
      newElement.classList = key
      newElement.textContent = value
      container.appendChild(newElement)
    }
  }
}
