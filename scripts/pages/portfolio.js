//Mettre le code JavaScript lié à la page photographer.html

import Media from '../pages/Media.js'

export function getIdFromURL() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  return id
}

const currentPhotographerId = getIdFromURL()
portfolioTemplate(currentPhotographerId)

async function portfolioTemplate(id) {
  const photographerData = JSON.parse(sessionStorage.getItem(id))
  const mediasJsonData = await getMediasById(id)

  //Generating HTML content
  generateHeader(photographerData)
  generateMediasSections(mediasJsonData, photographerData.name)
  generatePriceLikesAnchor(photographerData.price)

  handleLightbox()
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

//Function to fetch medias from local JSON file
async function getMediasById(id) {
  const url = './data/photographers.json'
  let response = await fetch(url)
  let data = await response.json()
  const photographerMedias = data.media.filter(media => media.photographerId == id)
  return photographerMedias
}

function generateMediasSections(mediasJsonData, photographerName) {
  const mediaDiv = document.querySelector('.medias')
  mediasJsonData.forEach(mediaItem => {
    const mediaObject = new Media(mediaItem, photographerName)
    const mediaHTML = mediaObject.createMedia()
    mediaDiv.appendChild(mediaHTML)
  })
}

function generatePriceLikesAnchor(price) {
  const sticky = document.querySelector('.sticky')
  sticky.innerHTML = `
  <div class='total-likes' title='Nombre de Likes' aria-label='Nombre de Likes'>
    <p class='number-likes'>123456</p>
    <span class='fa-solid fa-heart' aria-hidden='true'></span>
  </div>
  <p class='price'>${price}€ / jour</p>
  `
}
//Renommer en loadLightbox
function handleLightbox() {
  const mediasCount = document.querySelector('.medias').childElementCount
  const previousMedia = document.querySelector('.previous-button')
  const nextMedia = document.querySelector('.next-button')
  const closeButton = document.querySelector('.close-button')

  //Get all links (all links are in the medias section)
  const mediaLinks = Array.from(document.querySelectorAll('.medias article a'))

  let currentMediaIndex = -1

  mediaLinks.forEach(link => {
    link.addEventListener('click', () => {
      currentMediaIndex = mediaLinks.indexOf(link)

      //mediaFile is the image or video
      const mediaFile = link.children[0]
      const title = link.getAttribute('aria-label')
      openLightBox()
      changeLightboxMedia(mediaFile, title)
    })
  })

  previousMedia.addEventListener('click', () => {
    currentMediaIndex--
    if (currentMediaIndex < 0) currentMediaIndex = mediasCount - 1
    const previousMediaFile = mediaLinks[currentMediaIndex].children[0]
    const previousMediaTitle = mediaLinks[currentMediaIndex].getAttribute('aria-label')
    changeLightboxMedia(previousMediaFile, previousMediaTitle)
  })

  nextMedia.addEventListener('click', () => {
    currentMediaIndex++
    if (currentMediaIndex > mediasCount - 1) currentMediaIndex = 0
    const nextMediaFile = mediaLinks[currentMediaIndex].children[0]
    const nextMediaTitle = mediaLinks[currentMediaIndex].getAttribute('aria-label')
    changeLightboxMedia(nextMediaFile, nextMediaTitle)
  })

  closeButton.addEventListener('click', () => {
    closeLightBox()
    resetLightbox()
  })
}

function changeLightboxMedia(mediaFile, title) {
  resetLightbox()
  const lightbox = document.querySelector('.lightbox')
  console.log(mediaFile)
  console.log(mediaFile.tagName)
  if (mediaFile.tagName === 'IMG') {
    const img = document.createElement('img')
    img.src = mediaFile.src
    img.alt = mediaFile.alt
    img.classList.add('lightbox-media')
    lightbox.appendChild(img)
  } else if (mediaFile.tagName === 'VIDEO') {
    const video = document.createElement('video')
    video.setAttribute('controls', '')
    const source = document.createElement('source')
    source.src = document.querySelector('source').src
    video.appendChild(source)
    video.classList.add('lightbox-media')
    lightbox.appendChild(video)
  }
  const titleP = document.querySelector('.lightbox-title')
  titleP.innerHTML = title
}

function resetLightbox() {
  //Delete the media in the lightbox if there is one
  if (document.querySelector('.lightbox-media') !== null) {
    document.querySelector('.lightbox').removeChild(document.querySelector('.lightbox-media'))
  }
}

function openLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  lightboxContainer.classList.replace('closed', 'opened')
}

function closeLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  lightboxContainer.classList.replace('opened', 'closed')
}

// export getIdFromURL as default
