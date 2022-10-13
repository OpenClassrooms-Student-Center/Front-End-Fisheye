import { ContactButton } from "../components/ContactButton.js"
import { PhotographerPortrait } from "../components/PhotographerPortrait.js"
import { PhotographerProfile } from "../components/PhotographerProfile.js"

export class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer
  }
  
  createPhotographerHeader() {
    const wrapper = document.querySelector(".photograph-header")
    const photographerProfile = new PhotographerProfile(this.photographer)
    const contactButton = new ContactButton
    const photographerPicture = new PhotographerPortrait(this.photographer)
    photographerProfile.createProfile(wrapper)
    contactButton.createContactButton(wrapper)
    photographerPicture.createPortrait(wrapper)
    return wrapper
  }
}