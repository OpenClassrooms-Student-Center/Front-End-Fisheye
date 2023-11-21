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
  carousel()
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

function carousel() {
  const previousImage = document.querySelector('.previous-button')
  const nextImage = document.querySelector('.next-button')
  const closeButton = document.querySelector('.close-button')

  let position = 0

  const links = Array.from(document.querySelectorAll('article a'))

  links.forEach(link => {
    link.addEventListener('click', () => {
      position = links.indexOf(link)
      openLightBox()
      changeLightboxMedia(link)
    })
  })

  previousImage.addEventListener('click', () => {
    position--
    const numberOfImages = document.querySelector('.medias').childElementCount
    if (position < 0) position = numberOfImages - 1
    changeLightboxMedia(links[position])
  })

  nextImage.addEventListener('click', () => {
    position++
    const numberOfImages = document.querySelector('.medias').childElementCount
    if (position > numberOfImages - 1) position = 0
    changeLightboxMedia(links[position])
  })

  closeButton.addEventListener('click', () => {
    closeLightBox()
    resetLightbox()
  })
}

function openLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  lightboxContainer.classList.replace('closed', 'opened')
}

function closeLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  lightboxContainer.classList.replace('opened', 'closed')
}

function resetLightbox() {
  if (document.querySelector('.lightbox-media') !== null) {
    document.querySelector('.lightbox').removeChild(document.querySelector('.lightbox-media'))
  }
}

function changeLightboxMedia(link) {
  resetLightbox()
  const lightbox = document.querySelector('.lightbox')
  const media = link.children[0]
  console.log(media)

  if (media.tagName === 'IMG') {
    const img = document.createElement('img')
    img.src = media.src
    img.alt = media.alt
    img.classList.add('lightbox-media')
    lightbox.appendChild(img)
  } else if (media.tagName === 'VIDEO') {
    const video = document.createElement('video')
    const source = document.createElement('source')
    source.src = document.querySelector('source').src
    video.appendChild(source)
    video.classList.add('lightbox-media')
    lightbox.appendChild(video)
  }
  const title = document.querySelector('.lightbox-title')
  title.innerHTML = link.parentNode.querySelector('.title').innerHTML
  console.log(lightbox)
}
