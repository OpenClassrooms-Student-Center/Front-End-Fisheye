//import { MediaFactory } from "../factories/mediaFactory.js"
//import { displayedPhotographerData } from "../store/store.js"
//import { ModalsContainer } from "./ModalsContainer.js"

//export class ModalLightbox {
//  constructor(media) {
//    this.media = media
//  }

//  async createModalContainer() {
//    const modalContainer =
//    await new ModalsContainer(this.media).createModalContainer("lightbox-container")
//    modalContainer.innerHTML += `<a href="#" tabindex="0" aria-label="Previous image" id="lightbox_previous-media-button"><</a><div class="lightbox_media-container">
//    </div><a href="#" tabindex="0" aria-label="Next image" id="lightbox_next-media-button">></a>`
//    this.displayMedia(this.media)
//    this.createNavigation()
//  }

//  displayMedia(media) {
//    const mediaContainer = document.querySelector(".lightbox_media-container")
//    mediaContainer.innerHTML = new MediaFactory(media).createMedia()
//    if (media.video) {
//      document.querySelector(".lightbox_media").setAttribute("controls", "controls")
//    }
//  }

//  createNavigation() {
//    const storedMediaList = displayedPhotographerData.media
//    const previousMediaButton = document.querySelector(
//      "#lightbox_previous-media-button"
//    )
//    const nextMediaButton = document.querySelector(
//      "#lightbox_next-media-button"
//    )
//    previousMediaButton.addEventListener("click", () =>
//      this.displayPreviousMedia(storedMediaList)
//    )
//    nextMediaButton.addEventListener("click", () =>
//      this.displayNextMedia(storedMediaList)
//    )

//    // Enables keyboard navigation : escape to close modal, left arrow to display previous media, right arrow to display next media
//    document.querySelector("body").addEventListener("keydown", (event) => {
//      if (
//        event.key == "ArrowLeft" &&
//        document.querySelector(".lightbox-container")
//      ) {
//        this.displayPreviousMedia(storedMediaList)
//      } else if (
//        event.key == "ArrowRight" &&
//        document.querySelector(".lightbox-container")
//      ) {
//        this.displayNextMedia(storedMediaList)
//      }
//    })
//  }

//  // Get index of currently displayed media from the store, then get previous element in it. If displayed media is the first in the array, display the last media instead
//  displayPreviousMedia(storedMediaList) {
//    const displayedMedia = storedMediaList.find(
//      (media) => this.media.id == media.id
//    )
//    const displayedMediaIndex = storedMediaList.indexOf(displayedMedia)
//    let previousMediaIndex
//    if (displayedMediaIndex == 0) {
//      previousMediaIndex = storedMediaList.length - 1
//      const previousMedia = storedMediaList[previousMediaIndex]
//      this.media = previousMedia
//    } else {
//      previousMediaIndex = displayedMediaIndex - 1
//      const previousMedia = storedMediaList[previousMediaIndex]
//      this.media = previousMedia
//    }
//    new ModalLightbox(this.media).displayMedia(
//      storedMediaList[previousMediaIndex]
//    )
//  }

//  displayNextMedia(storedMediaList) {
//    const displayedMedia = storedMediaList.find(
//      (media) => this.media.id == media.id
//    )
//    const displayedMediaIndex = storedMediaList.indexOf(displayedMedia)
//    let nextMediaIndex
//    if (displayedMediaIndex == storedMediaList.length - 1) {
//      nextMediaIndex = 0
//      const nextMedia = storedMediaList[nextMediaIndex]
//      this.media = nextMedia
//    } else {
//      nextMediaIndex = displayedMediaIndex + 1
//      const nextMedia = storedMediaList[nextMediaIndex]
//      this.media = nextMedia
//    }
//    new ModalLightbox(this.media).displayMedia(storedMediaList[nextMediaIndex])
//  }
//}
