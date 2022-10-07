export function photographerFactory(data) {
  const { city, country, id, name, portrait, price, tagline } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const cardContainer = document.createElement("article")
    const cardLink = document.createElement("a")
    // const descriptionContainer = document.createElement("p")
    createCardProfile(name, cardLink, picture)
    cardLink.href = "#"
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

function createCardDescription(photographerInfo, container) {
  const location = document.createElement("p")
  const tagline = document.createElement("p")
  const price = document.createElement("p")
  console.log(photographerInfo)
  location.textContent = `${photographerInfo.city}, ${photographerInfo.country}`
  tagline.textContent = `${photographerInfo.tagline}`
  price.textContent = `${photographerInfo.price}€/jour`
  location.classList = "location"
  tagline.classList = "tagline"
  price.classList = "price"
  container.appendChild(location)
  container.appendChild(tagline)
  container.appendChild(price)
}
