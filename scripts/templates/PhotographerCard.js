export class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard() {
    const cardContainer = document.createElement("article")
    const cardLink = document.createElement("a")
    cardContainer.appendChild(cardLink)
    cardLink.href = `photographer.html?id=${this._photographer.id}`
    cardLink.ariaLabel = this._photographer.name

    // Create the upper part of the cards, containing the photo and name of the photographer :
    const photographerPicture = document.createElement("img")
    photographerPicture.setAttribute(
      "src",
      `assets/photographers/${this._photographer.portrait}`
    )
    photographerPicture.alt = `Photo de profil de ${this._photographer.name}`
    const photographerName = document.createElement("h2")
    photographerName.textContent = this._photographer.name
    cardLink.appendChild(photographerPicture)
    cardLink.appendChild(photographerName)
    // Create the lower part of the cards, containing the location, tagline and price of each photographer
    const photographerInfos = {
      location: `${this._photographer.location}`,
      tagline: `${this._photographer.tagline}`,
      price: `${this._photographer.price}€/jour`,
    }
    for (let [key, value] of Object.entries(photographerInfos)) {
      const newElement = document.createElement("p")
      newElement.classList = key
      newElement.textContent = value
      cardContainer.appendChild(newElement)
    }
    return cardContainer
  }
}
