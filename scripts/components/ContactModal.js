import { ModalsContainer } from "./ModalsContainer.js"

export class ContactModal {
  constructor(photographer) {
    this.photographer = photographer
  }

  createModalButton(wrapper) {
    const openModalButton = document.createElement("button")
    openModalButton.textContent = "Contactez-moi"
    openModalButton.classList = "open_modal_button"
    wrapper.appendChild(openModalButton)
    return wrapper
  }

  static addModalEventListeners() {
    const openModalButton = document.querySelector(".open_modal_button")
    const closeModalButton = document.querySelector(".close_modal_button")
    openModalButton.addEventListener("click", () => this.displayModal(event))
    closeModalButton.addEventListener("click", () => this.closeModal())
  }
  
  static displayModal(event) {
    event.preventDefault()
    const modal = ModalsContainer.createModalContainer("contact-modal")
    modal.style.display = "block"
  }

  static closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
  }
}
