import { displayModal } from "../../utils/contactForm.js"

export class ContactButton {
  constructor() {}

  createContactButton(wrapper) {
    // const wrapper = document.createElement("div")
    const contactButton = document.createElement("button")
    contactButton.textContent = "Contactez-moi"
    contactButton.classList = "contact_button"
    contactButton.addEventListener("click", displayModal)
    wrapper.appendChild(contactButton)
    return wrapper
  }
}
