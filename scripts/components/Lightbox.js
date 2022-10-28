import { MediaFactory } from "../factories/mediaFactory.js"

export class ModalLightbox {
  constructor(media) {
    this.media = media
  }

  createModalContainer() {
    const wrapper = document.querySelector("body")
    const lightboxContainer = document.createElement("div")
    lightboxContainer.classList = "lightbox-container"
    wrapper.appendChild(lightboxContainer)
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:none"
    }
    lightboxContainer.innerHTML = `<a href="#" tabindex="0" aria-label="Previous image"><</a><div class="lightbox_media-container">
    ${new MediaFactory(this.media).createMedia()}
    </div><div class="lightbox_right-panel"><button class="lightbox_close-button" aria-label="Close dialog" tabindex="0">X</button><a href="#" tabindex="0" aria-label="Next image">></a></div>`
    this.createNavigation()
  }

  createNavigation() {
    const closeLightboxButton = document.querySelector(".lightbox_close-button")
    closeLightboxButton.addEventListener("click", () => this.closeLightbox())
  }

  closeLightbox() {
    document.querySelector(".lightbox-container").remove()
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:block"
    }
    return
  }
}
