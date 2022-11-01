//import { ModalLightbox } from "../components/Lightbox.js"
import { PhotographerMedia } from "../components/PhotographerMedia.js"
import { PhotographerProfile } from "../components/PhotographerProfile.js"
import { displayedPhotographerData } from "../store/store.js"

export class Photographer {
  constructor(photographer) {
    this.city = photographer.city
    this.country = photographer.country
    this.location = `${this.city}, ${this.country}`
    this.id = photographer.id
    this.name = photographer.name
    this.portrait = photographer.portrait
    this.price = photographer.price
    this.tagline = photographer.tagline
    this.totalLikes = photographer.totalLikes
  }

  displayHome() {
    const template = new PhotographerProfile(this)
    document
      .querySelector(".photographer_section")
      .appendChild(template.createPhotographerCard())
  }

  displayProfile() {
    const template = new PhotographerProfile(this)
    document
      .querySelector("#main")
      .appendChild(template.createPhotographerHeader())
    template.createprofilePageInsert()
    PhotographerMedia.createDropdownOrder()
    PhotographerMedia.createMediaSection()
    displayedPhotographerData.media.forEach((element) => {
      const template = new PhotographerMedia(element)
      document
        .querySelector(".photographer-media")
        .appendChild(template.createMediaList())
      template.addLikes()
      template.addLightboxEventListener()
    })
    PhotographerMedia.sortMedia()
  }
}
