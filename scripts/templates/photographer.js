function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement('article')

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('img_container')

    const profilePicture = document.createElement('img')
    profilePicture.setAttribute('src', picture)

    const nameHeadline = document.createElement('h2')
    nameHeadline.textContent = name

    const locationP = document.createElement('p')
    locationP.textContent = `${city}, ${country}`
    locationP.classList.add('location')

    const tagP = document.createElement('p')
    tagP.textContent = tagline
    tagP.classList.add('tag')

    const priceP = document.createElement('p')
    priceP.textContent = price + '€/jour'
    priceP.classList.add('price')

    imgContainer.appendChild(profilePicture)
    article.appendChild(imgContainer)
    // article.appendChild(profilePicture)
    article.appendChild(nameHeadline)
    article.appendChild(locationP)
    article.appendChild(tagP)
    article.appendChild(priceP)

    return article
  }
  return { name, picture, getUserCardDOM }
}
