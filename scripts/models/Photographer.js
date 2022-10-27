import { PhotographerProfile } from "../components/PhotographerProfile.js"

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
    this.likes = photographer.totalLikes
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
    template.createprofilePageInsert(this.likes)
  }
}
