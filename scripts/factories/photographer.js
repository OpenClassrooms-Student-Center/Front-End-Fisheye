// eslint-disable-next-line no-unused-vars
function photographerFactory (data) {
  const {
    city,
    country,
    id,
    name,
    portrait,
    price,
    tagline
  } = data

  const picture = `assets/images/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    article.classList.add('photographerCard')
    const photographerLink = document.createElement('a')
    photographerLink.setAttribute('href', 'photographer.html?id=' + id)
    photographerLink.setAttribute('title', `Lien vers le photographe ${name}`)
    photographerLink.classList.add('photographerCard__link')
    const img = document.createElement('img')
    img.classList.add('photographerCard__img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', '')
    const h2 = document.createElement('h2')
    h2.classList.add('photographerCard__title')
    h2.textContent = name
    photographerLink.appendChild(img)
    photographerLink.appendChild(h2)
    article.appendChild(photographerLink)
    const photographerInfos = document.createElement('div')
    photographerInfos.classList.add('photographerCard__infos')
    const locationElt = document.createElement('p')
    locationElt.textContent = `${city}, ${country}`
    locationElt.classList.add('photographerCard__infos--location')
    const taglineElt = document.createElement('p')
    taglineElt.textContent = tagline
    taglineElt.classList.add('photographerCard__infos--tagline')
    const priceElt = document.createElement('p')
    priceElt.textContent = `${price}€/jour`
    priceElt.classList.add('photographerCard__infos--price')
    photographerInfos.appendChild(locationElt)
    photographerInfos.appendChild(taglineElt)
    photographerInfos.appendChild(priceElt)
    article.appendChild(photographerInfos)

    return (article)
  }

  function getPhotographerInfoDOM () {
    const photographerInfos = document.createElement('div')
    photographerInfos.classList.add('photographHeader__infos')

    const h1 = document.createElement('h1')
    h1.classList.add('photographHeader__infos--title')
    h1.textContent = name
    photographerInfos.appendChild(h1)

    const locationElt = document.createElement('p')
    locationElt.textContent = `${city}, ${country}`
    locationElt.classList.add('photographHeader__infos--location')
    photographerInfos.appendChild(locationElt)

    const taglineElt = document.createElement('p')
    taglineElt.textContent = tagline
    taglineElt.classList.add('photographHeader__infos--tagline')
    photographerInfos.appendChild(taglineElt)

    return (photographerInfos)
  }

  function getPhotographerContactDOM () {
    const photographerContact = document.createElement('div')
    photographerContact.classList.add('photographHeader__contact')

    const contactBtn = document.createElement('button')
    contactBtn.classList.add('contact_button')
    contactBtn.textContent = 'Contactez-moi'
    // eslint-disable-next-line no-undef
    contactBtn.addEventListener('click', displayModal)
    photographerContact.appendChild(contactBtn)

    return photographerContact
  }

  function getPhotographerImgDOM () {
    const photographerImg = document.createElement('div')
    photographerImg.classList.add('photographHeader__img')

    const img = document.createElement('img')
    img.classList.add('photographHeader__img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', '')
    photographerImg.appendChild(img)

    return photographerImg
  }

  return {
    city,
    country,
    id,
    name,
    portrait,
    price,
    tagline,
    getUserCardDOM,
    getPhotographerInfoDOM,
    getPhotographerContactDOM,
    getPhotographerImgDOM
  }
}
