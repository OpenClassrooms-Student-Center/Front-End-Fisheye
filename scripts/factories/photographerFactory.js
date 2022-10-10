export function photographerFactory(data) {
  const { city, country, id, name, portrait, price, tagline } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const cardContainer = document.createElement("article")
    const cardLink = document.createElement("a")
    createCardProfile(name, cardLink, picture)
    cardLink.href = `photographer.html?id=${id}`
    cardLink.ariaLabel = name
    cardContainer.appendChild(cardLink)
    createCardDescription(
      { city, country, price, tagline },
      cardContainer
    )
    return cardContainer
  }
  return { getUserCardDOM }
}

// Create the upper part of the cards, containing the photo and name of the photographer
function createCardProfile(name, container, picture) {
  const photographerPicture = document.createElement("img")
  photographerPicture.setAttribute("src", picture)
  photographerPicture.alt = `Photo de profil de ${name}`
  const photographerName = document.createElement("h2")
  photographerName.textContent = name
  container.appendChild(photographerPicture)
  container.appendChild(photographerName)
}

// Create the lower part of the cards, containing the location, tagline and price of each photographer
function createCardDescription(photographerInfo, container) {
  let elementContent = {
    location: `${photographerInfo.city}, ${photographerInfo.country}`,
    tagline: `${photographerInfo.tagline}`,
    price: `${photographerInfo.price}€/jour`,
  }
  for (let [key, value] of Object.entries(elementContent)) {
    const newElement = document.createElement("p")
    newElement.classList = key
    newElement.textContent = value
    container.appendChild(newElement)
  }
}
