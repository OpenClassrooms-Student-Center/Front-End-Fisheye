import { onOpenPic, onClosePic } from "../utils/photoModal.js";

class Lightbox {
  constructor (media, photographer) {
    this._media = media
    this._photographer = photographer
    this.currentIndex = 0
  }

  createLightbox (media, photographer, mediaId) {
    let selectedMedia = null
    const selectedMediaArray = []

    media = media.sort((a, b) =>
      a.id === mediaId ? -1 : b.id === mediaId ? 1 : 0
    )

    media.forEach((mediaItem) => {
      // console.log(mediaItem);
      if (mediaItem.id === mediaId) {
        selectedMedia = mediaItem
        selectedMediaArray.unshift(selectedMedia)
      }
    })

    const carouselWrapper = document.querySelector('#modal-wrapper')
    const carouselContainer = document.createElement('ul')
    carouselContainer.classList.add('carousel')

    const carouselControls = document.createElement('div')
    carouselControls.classList.add('controls')

    const closingModal = document.createElement('img')
    closingModal.alt = 'image close'
    closingModal.setAttribute('id', 'modalClose')
    closingModal.src = 'assets/icons/blackClose.svg'
    closingModal.onclick = onClosePic

    const controlsPrevious = document.createElement('img')
    controlsPrevious.src = 'assets/icons/icon-arrow-chevron-right.svg'
    controlsPrevious.alt = 'previous'
    controlsPrevious.classList.add('controls-previous', 'controls')

    const spanPrevious = document.createElement('span')
    spanPrevious.classList.add('previous-img')
    const spanNext = document.createElement('span')
    spanNext.classList.add('next-img')

    const controlsNext = document.createElement('img')
    controlsNext.classList.add('controls-next', 'controls')
    controlsNext.src = 'assets/icons/icon-arrow-chevron-left.svg'
    controlsNext.alt = 'previous'

    const carouselElements = document.createElement('div')
    carouselElements.classList.add('carousel-elements')

    const carouselArrows = document.createElement('div')
    carouselArrows.classList.add('carousel-arrows')

    let currentIndex = 0

    controlsNext.addEventListener('click', () => {
      const currentLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      )
      if (currentLi) {
        currentLi.style.display = 'none'
      }
      currentIndex--
      if (currentIndex < 0) {
        currentIndex = media.length - 1
      }
      const newLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      )
      if (newLi) {
        newLi.style.display = 'flex'
      }
    })

    $(document).on('keydown', (e) => {
      const keyCode = e.keyCode ? e.keyCode : e.which
      if (keyCode === 39) {
        controlsPrevious.click()
      } else if (keyCode === 37) {
        controlsNext.click()
      }
    })

    controlsPrevious.addEventListener('click', () => {
      const currentLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      )
      if (currentLi) {
        currentLi.style.display = 'none'
      }

      currentIndex++

      if (currentIndex >= media.length) {
        currentIndex = 0
      }

      const newLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      )
      if (newLi) {
        newLi.style.display = 'flex'
      }
    })

    media.forEach((mediaItem, index) => {
      const carouselLi = document.createElement('li')
      carouselLi.classList.add('carousel-item-' + index)
      carouselLi.classList.add('carousel-block')

      carouselLi.style.display = index === 0 ? 'flex' : 'none'

      const carouselTitle = document.createElement('h2')
      carouselTitle.classList.add('carousel-title')

      carouselTitle.innerHTML = mediaItem.title

      if (mediaItem.image) {
        const carouselImg = document.createElement('img')
        carouselImg.innerHTML = 'Type: Image'
        carouselImg.alt = `${mediaItem.image}`

        const mediaPath = `assets/images/${photographer.name}/${mediaItem.image}`
        // console.log(mediaPath);
        carouselImg.classList.add('carousel-media')

        carouselImg.setAttribute('id', `media-${mediaItem.image}`)
        carouselImg.innerHTML = 'Type: Image'
        carouselImg.src = mediaPath
        carouselImg.alt = mediaItem.title
        carouselImg.onClick = onOpenPic()

        carouselLi.appendChild(carouselImg)
      } else if (mediaItem.video) {
        const carouselVideo = document.createElement('video')
        carouselVideo.innerHTML = 'Type: Video'
        carouselVideo.classList.add('carousel-media')
        const mediaPath = `assets/images/${photographer.name}/${mediaItem.video}`
        console.log(mediaPath)
        carouselVideo.setAttribute('id', `media-${mediaId}`)
        carouselVideo.innerHTML = 'Type: Video'
        carouselVideo.src = mediaPath
        carouselVideo.alt = mediaItem.title
        carouselVideo.controls = true

        carouselLi.appendChild(carouselVideo)
      }
      carouselElements.appendChild(carouselTitle)
      carouselLi.appendChild(carouselTitle)
      carouselContainer.appendChild(carouselLi)

      controlsNext.appendChild(spanPrevious)
      controlsPrevious.appendChild(spanPrevious)
      carouselControls.appendChild(controlsNext)
      carouselControls.appendChild(controlsPrevious)

      carouselWrapper.appendChild(closingModal)
      carouselWrapper.appendChild(carouselControls)
      carouselWrapper.appendChild(carouselContainer)
    })
    return carouselContainer
  }
}

export { Lightbox }
