export class ModalDisplayButtons {
  constructor() {}

  static createModalButton(wrapper) {
    const openModalButton = document.createElement("button")
    openModalButton.textContent = "Contactez-moi"
    openModalButton.classList = "open_modal_button"
    wrapper.appendChild(openModalButton)
    return wrapper
  }

  static displayModal(event) {
    event.preventDefault()
    const modal = document.getElementById("contact_modal")
    modal.style.display = "block"
  }

  static closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
  }
}
