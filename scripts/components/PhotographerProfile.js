import { faHeartIcon } from "./faHeartIcon.js"
//import { ContactModal } from "./ContactModal.js"
import { ModalFactory } from "../factories/modalFactory.js"

export class PhotographerProfile {
  constructor(photographer) {
    this.photographer = photographer
  }

  // Create photographer cards displayed on main page
  createPhotographerCard() {
    const cardContainer = document.createElement("article")
    const cardLink = document.createElement("a")
    cardContainer.appendChild(cardLink)
    cardLink.href = `photographer.html?id=${this.photographer.id}`
    cardLink.ariaLabel = this.photographer.name
    this.createPhotographerPicture(cardLink)
    document
      .querySelector("main")
      .appendChild(this.createProfile(cardContainer, "homePage"))
    return cardContainer
  }

  // Creates the photographer picture element on main page
  createPhotographerPicture(wrapper) {
    wrapper.innerHTML += `<img src=assets/photographers/${this.photographer.portrait} alt=${this.photographer.name} class="photographer-portrait">`
  }

  // Create main info about photographers
  createProfile(wrapper, page) {
    wrapper.innerHTML += `<article class="photographer-profile">${
      page == "homePage"
        ? `<h2 class="photographer-name">${this.photographer.name}</h2>`
        : `<h1 class="photographer-name">${this.photographer.name}</h1>`
    }<p class="photographer-location">${
      this.photographer.location
    }</p><p class="photographer-tagline">${this.photographer.tagline}</p>
    ${
      page == "homePage"
        ? `<p class="photographer-price">${this.photographer.price}€/jour</p>`
        : ""
    }</article>`
    return wrapper
  }

  createPhotographerHeader() {
    const wrapper = document.querySelector(".photograph-header")
    this.createProfile(wrapper, "profilePage")
    const openModalButton = document.createElement("button")
    openModalButton.textContent = "Contactez-moi"
    openModalButton.classList = "open_modal_button"
    openModalButton.id = "profile_contact-button"
    wrapper.appendChild(openModalButton)
    const body = document.querySelector("body")
    body.addEventListener("click", (event) => {
      if (event.target.classList == "open_modal_button") {
        new ModalFactory("contact", this.photographer).displayModal(event)
      }
    })
    this.createPhotographerPicture(wrapper)
    return wrapper
  }

  createprofilePageInsert() {
    const wrapper = document.querySelector("#main")
    wrapper.innerHTML += `<aside class="insert"><div class="total-likes-container"><data aria-label="Total likes" value='${this.photographer.totalLikes}' class="total-likes">${this.photographer.totalLikes}</data> ${faHeartIcon}</div><div><data class="price" aria-label="Daily price" value='${this.photographer.price}'>${this.photographer.price}</data>€ / jour</div></aside>`
    return wrapper
  }
}
