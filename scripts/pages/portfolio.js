//Mettre le code JavaScript lié à la page photographer.html

import Media from '../pages/Media.js'

async function portfolioTemplate(id) {
  const data = JSON.parse(sessionStorage.getItem(id))

  const contactBtn = document.querySelector('.contact-button').cloneNode(true)
  const photographHeader = document.querySelector('.photograph-header')
  photographHeader.innerHTML = ''
  photographHeader.innerHTML = `
  <div class="photographer-profile">
    <h1 class='photographer-name'>${data.name}</h1>
    <h2 class="location">${data.city}, ${data.country}</h2>
    <h3 class="tag">${data.tagline}</h3>
  </div>
  ${contactBtn.outerHTML}
  <img class='profile-picture' src="assets/photographers/${data.portrait}" alt="${data.name}">
  `

  const mediaDiv = document.querySelector('.media')
  const medias = await getMediasById(id)
  medias.forEach(media => {
    const mediaObject = new Media(media, data.name)
    const mediaHTML = mediaObject.createMedia()
    mediaDiv.appendChild(mediaHTML)
  })
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
