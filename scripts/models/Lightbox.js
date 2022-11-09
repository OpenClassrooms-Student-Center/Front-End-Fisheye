import { MediaFactory } from "../factories/mediaFactory.js"
import { displayedPhotographerData } from "../store/store.js"
import { Modal } from "./Modal.js"

export class ModalLightbox extends Modal {
  constructor(media) {
    super(media)
    this.media = media
  }

  // Creates the structure of the modal
  getModalContainer() {
    new Modal(this.media).createModalContainer()
    const lightboxContainer = document.querySelector(".modal-container > div")
    lightboxContainer.classList.add("lightbox-container")
    lightboxContainer.setAttribute("aria-label", "image close-up view")
    lightboxContainer.innerHTML += `<a href="#" tabindex="0" aria-label="Previous image" id="lightbox_previous-media-button"><</a>
    <div class="lightbox_media-container">
    </div>
    <div class="lightbox_right-panel">
    <a href="#" tabindex="0" aria-label="Next image" id="lightbox_next-media-button">></a></div>`
    this.displayMedia(this.media)
    this.createNavigation()
  }

  // Displays the media in the lightbox, and adds video player controls if applicable
  displayMedia(media) {
    const mediaContainer = document.querySelector(".lightbox_media-container")
    mediaContainer.innerHTML = new MediaFactory(media).createMedia()
    document.querySelector(".lightbox_media").removeAttribute("tabindex")
    if (media.video) {
      document
        .querySelector(".lightbox_media")
        .setAttribute("controls", "controls")
    }
  }

  // Adds events to elements used for navigation
  createNavigation() {
    const storedMediaList = displayedPhotographerData.media
    const previousMediaButton = document.querySelector(
      "#lightbox_previous-media-button"
    )
    const nextMediaButton = document.querySelector(
      "#lightbox_next-media-button"
    )

    previousMediaButton.addEventListener("click", () =>
      this.modalNavigation(storedMediaList, "displayPreviousMedia")
    )
    nextMediaButton.addEventListener("click", () =>
      this.modalNavigation(storedMediaList, "displayNextMedia")
    )

    // Enables keyboard navigation : left arrow to display previous media, right arrow to display next media
    document.querySelector("body").addEventListener("keydown", (event) => {
      if (document.querySelector(".lightbox-container") !== null) {
        if (event.key == "ArrowLeft") {
          this.modalNavigation(storedMediaList, "displayPreviousMedia")
        } else if (event.key == "ArrowRight") {
          this.modalNavigation(storedMediaList, "displayNextMedia")
        }
      }
    })
  }

  // Get index of currently displayed media from the store, then get previous/next element in it. If displayed media is the first/last in the array and user want the previous/next media, displays the last/first media instead.

  modalNavigation(storedMediaList, navigationDirection) {
    const displayedMedia = storedMediaList.find(
      (media) => this.media.id == media.id
    )
    const displayedMediaIndex = storedMediaList.indexOf(displayedMedia)
    let mediaToDisplay
    let indexOfMediaToDisplay

    if (navigationDirection === "displayPreviousMedia") {
      if (displayedMediaIndex == 0) {
        indexOfMediaToDisplay = storedMediaList.length - 1
      } else {
        indexOfMediaToDisplay = displayedMediaIndex - 1
      }
    } else if (navigationDirection === "displayNextMedia") {
      if (displayedMediaIndex == storedMediaList.length - 1) {
        indexOfMediaToDisplay = 0
      } else {
        indexOfMediaToDisplay = displayedMediaIndex + 1
      }
    }

    mediaToDisplay = storedMediaList[indexOfMediaToDisplay]
    this.media = mediaToDisplay
    this.displayMedia(mediaToDisplay)
  }
}
