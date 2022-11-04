import { Modal } from "./Modal.js"

export class ContactModal extends Modal {
  constructor(photographer) {
    super(photographer)
    this.photographer = photographer
  }

  displayModal(event) {
    event.preventDefault()
    const modalContainer = new Modal(this.photographer).createModalContainer(event)
    modalContainer.classList.add("contact-modal")
    modalContainer.innerHTML += `  
    <h2>Contactez-moi <br>${this.photographer.name}</h2>
    <form>
    <div>
      <label>Prénom</label>
      <input />
      <label>Nom</label>
      <input />
      <label>Email</label>
      <input />
      <label>Votre message</label>
      <input />
    </div>
    <button class="contact_button">Envoyer</button>
  </form>`
  }
}
