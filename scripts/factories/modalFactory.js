import { ContactModal } from "../models/ContactModal.js"
import { ModalLightbox } from "../models/Lightbox.js"

export class ModalFactory {
  constructor(modal, data) {
    if (modal == "lightbox") {
      return new ModalLightbox(data)
    } else if (modal == "contact") {
      return new ContactModal(data)
    } else {
      throw "Error"
    }
  }
}
