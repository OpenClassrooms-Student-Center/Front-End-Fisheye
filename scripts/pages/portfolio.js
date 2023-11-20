//Mettre le code JavaScript lié à la page photographer.html

import Media from '../pages/Media.js'

async function portfolioTemplate(id) {
  const photographerData = JSON.parse(sessionStorage.getItem(id))
  generateHeader(photographerData)

  const mediaDiv = document.querySelector('.medias')
  const medias = await getMediasById(id)
  medias.forEach(media => {
    const mediaObject = new Media(media, photographerData.name)
    const mediaHTML = mediaObject.createMedia()
    mediaDiv.appendChild(mediaHTML)
  })

  const sticky = document.querySelector('.sticky')
  sticky.innerHTML = `
  <div class='total-likes' title='Nombre de Likes' aria-label='Nombre de Likes'>
    <p class='number-likes'>123456</p>
    <span class='fa-solid fa-heart' aria-hidden='true'></span>
  </div>
  <p class='price'>${photographerData.price}€ / jour</p>
  `
}

function generateHeader(photographerData) {
  const contactBtn = document.querySelector('.contact-button').cloneNode(true)
  const photographHeader = document.querySelector('.photograph-header')
  photographHeader.innerHTML = ''
  photographHeader.innerHTML = `
  <div class="photographer-profile">
    <h1 class='photographer-name'>${photographerData.name}</h1>
    <h2 class="location">${photographerData.city}, ${photographerData.country}</h2>
    <h3 class="tag">${photographerData.tagline}</h3>
  </div>
  ${contactBtn.outerHTML}
  <img class='profile-picture' src="assets/photographers/${photographerData.portrait}" alt="${photographerData.name}">
  `
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
portfolioTemplate(id)

async function getMediasById(id) {
  const url = './data/photographers.json'
  let response = await fetch(url)
  let data = await response.json()
  const photographerMedias = data.media.filter(media => media.photographerId == id)
  return photographerMedias
}
