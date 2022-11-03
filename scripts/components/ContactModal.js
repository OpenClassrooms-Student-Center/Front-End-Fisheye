//import { ModalsContainer } from "./ModalsContainer.js"

//export class ContactModal {
//  constructor(photographer) {
//    this.photographer = photographer
//  }

//  static createModalButton(wrapper, photographer) {
//    const openModalButton = document.createElement("button")
//    openModalButton.textContent = "Contactez-moi"
//    openModalButton.classList = "open_modal_button"
//    openModalButton.id = "profile_contact-button"
//    wrapper.appendChild(openModalButton)

//    document.querySelector("body").addEventListener("click", (event) => {
//      if (event.target.classList == "open_modal_button") {
//        new ContactModal(photographer.name).displayModal()
//      }
//    })
//    return wrapper
//  }

//  displayModal() {
//    (event) => event.preventDefault()
//    const modal = new ModalsContainer(this.photographer).createModalContainer("contact-modal", event)
//    modal.setAttribute("aria-modal", "true")
//    modal.style.display = "block"
//    modal.innerHTML += `  
//  <form>
//    <div>
//      <label>Prénom</label>
//      <input />
//      <label>Nom</label>
//      <input />
//      <label>Email</label>
//      <input />
//      <label>Votre message</label>
//      <input />
//    </div>
//    <button class="contact_button">Envoyer</button>
//  </form>`
//  modal.focus()
//}
//}
