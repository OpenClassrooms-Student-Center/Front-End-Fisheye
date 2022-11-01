import { MediaFactory } from "../factories/mediaFactory.js"
import { displayedPhotographerData } from "../store/store.js"

export class ModalLightbox {
  constructor(media) {
    this.media = media
  }

  createModalContainer() {
    const body = document.querySelector("body")
    const lightboxContainer = document.createElement("div")
    lightboxContainer.classList = "lightbox-container"
    body.appendChild(lightboxContainer)
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:none"
    }
    lightboxContainer.innerHTML = `<a href="#" tabindex="0" aria-label="Previous image" id="lightbox_previous-media-button"><</a><div class="lightbox_media-container">
    </div><div class="lightbox_right-panel"><button class="lightbox_close-button" aria-label="Close dialog" tabindex="0">X</button><a href="#" tabindex="0" aria-label="Next image" id="lightbox_next-media-button">></a></div>`
    this.displayMedia(this.media)
    this.createNavigation(body)
  }

  displayMedia(media) {
    const mediaContainer = document.querySelector(".lightbox_media-container")
    mediaContainer.innerHTML = new MediaFactory(media).createMedia()
  }

  createNavigation(body) {
    const storedMediaList = displayedPhotographerData.media
    const closeLightboxButton = document.querySelector(".lightbox_close-button")
    const previousMediaButton = document.querySelector(
      "#lightbox_previous-media-button"
    )
    const nextMediaButton = document.querySelector(
      "#lightbox_next-media-button"
    )
    closeLightboxButton.addEventListener("click", () => this.closeLightbox())
    previousMediaButton.addEventListener("click", () =>
      this.displayPreviousMedia(storedMediaList)
    )
    nextMediaButton.addEventListener("click", () =>
      this.displayNextMedia(storedMediaList)
    )

    // Enables keyboard navigation : escape to close modal, left arrow to display previous media, right arrow to display next media
    body.addEventListener("keydown", (event) => {
      if (
        event.key == "Escape" &&
        document.querySelector(".lightbox-container")
      ) {
        this.closeLightbox()
      } else if (
        event.key == "ArrowLeft" &&
        document.querySelector(".lightbox-container")
      ) {
        this.displayPreviousMedia(storedMediaList)
      } else if (
        event.key == "ArrowRight" &&
        document.querySelector(".lightbox-container")
      ) {
        this.displayNextMedia(storedMediaList)
      }
    })
  }

  closeLightbox() {
    document.querySelector(".lightbox-container").remove()
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:block"
    }
    return
  }

  // Get index of currently displayed media from the store, then get previous element in it. If displayed media is the first in the array, display the last media instead
  displayPreviousMedia(storedMediaList) {
    const displayedMedia = storedMediaList.find(
      (media) => this.media.id == media.id
    )
    const displayedMediaIndex = storedMediaList.indexOf(displayedMedia)
    let previousMediaIndex
    if (displayedMediaIndex == 0) {
      previousMediaIndex = storedMediaList.length - 1
      const previousMedia = storedMediaList[previousMediaIndex]
      this.media = previousMedia
    } else {
      previousMediaIndex = displayedMediaIndex - 1
      const previousMedia = storedMediaList[previousMediaIndex]
      this.media = previousMedia
    }
    new ModalLightbox(this.media).displayMedia(
      storedMediaList[previousMediaIndex]
    )
  }

  displayNextMedia(storedMediaList) {
    const displayedMedia = storedMediaList.find(
      (media) => this.media.id == media.id
    )
    const displayedMediaIndex = storedMediaList.indexOf(displayedMedia)
    let nextMediaIndex
    if (displayedMediaIndex == storedMediaList.length - 1) {
      nextMediaIndex = 0
      const nextMedia = storedMediaList[nextMediaIndex]
      this.media = nextMedia
    } else {
      nextMediaIndex = displayedMediaIndex + 1
      const nextMedia = storedMediaList[nextMediaIndex]
      this.media = nextMedia
    }
    new ModalLightbox(this.media).displayMedia(storedMediaList[nextMediaIndex])
  }
}
