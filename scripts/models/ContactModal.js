import { Modal } from "./Modal.js"

export class ContactModal extends Modal {
  constructor(photographer) {
    super(photographer)
    this.photographer = photographer
  }

  displayModal(event) {
    event.preventDefault()
    const modalContainer = new Modal(this.photographer).createModalContainer(
      event
    )
    modalContainer.classList.add("contact-modal")
    modalContainer.setAttribute(
      "aria-label",
      `Contact me ${this.photographer.name}`
    )
    modalContainer.setAttribute(
      "labelled-by",
      "#contact_modal-photographer-header"
    )
    modalContainer.innerHTML += `  
    <div class="contact-modal_container">
    <h1 id="contact_modal-photographer-header" class="contact-modal_header">Contactez-moi <br>${this.photographer.name}</h1>
    <form>
    <label>Prénom<input type="text" name="firstname"></label>
    <label>Nom<input type="text" name="lastname" ></label>
      <label>Email<input type="email" name="email"></label>
      <label>Votre message<input type="text" class="contact-modal_message" name="message"></label>
    <button class="contact_button contact-modal_submit-button" aria-label="Send" >Envoyer</button>
  </form></div>`
  const modalCloseButton = document.querySelector(".modal_close-button")
  document.querySelector(".contact-modal_container > form").after(modalCloseButton)
    document
      .querySelector("body")
      .addEventListener("submit", (event) => event.preventDefault())
  }
}