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
      const Template = new PhotographerProfile(this)
      document
        .querySelector(".photographer_section")
        .appendChild(Template.createPhotographerCard())
  }

  displayProfile() {
    const Template = new PhotographerProfile(this)
    document
      .querySelector("#main")
      .appendChild(Template.createPhotographerHeader())
    Template.createprofilePageInsert(this.likes)
  }
}
