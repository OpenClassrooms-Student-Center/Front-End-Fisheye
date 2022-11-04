import { MediaFactory } from "../factories/mediaFactory.js"
import { displayedPhotographerData } from "../store/store.js"
import { Modal } from "./Modal.js"

export class ModalLightbox extends Modal {
  constructor(media) {
    super(media)
    this.media = media
  }

  createModalContainer() {
    const modalContainer = new Modal(this.media).createModalContainer()
    modalContainer.classList.add("lightbox-container")
    modalContainer.innerHTML += `<a href="#" tabindex="0" aria-label="Previous image" id="lightbox_previous-media-button"><</a><div class="lightbox_media-container">
    </div><a href="#" tabindex="0" aria-label="Next image" id="lightbox_next-media-button">></a>`
    this.displayMedia(this.media)
    this.createNavigation()
  }

  displayMedia(media) {
    const mediaContainer = document.querySelector(".lightbox_media-container")
    mediaContainer.innerHTML = new MediaFactory(media).createMedia()
    if (media.video) {
      document
        .querySelector(".lightbox_media")
        .setAttribute("controls", "controls")
    }
  }

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
    console.log(event)
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
