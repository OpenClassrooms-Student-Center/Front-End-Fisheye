import { PhotographerProfile } from "../components/PhotographerProfile.js"

export class Photographer {
  constructor(data) {
    this.city = data.city
    this.country = data.country
    this.location = `${this.city}, ${this.country}`
    this.id = data.id
    this.name = data.name
    this.portrait = data.portrait
    this.price = data.price
    this.tagline = data.tagline
    this.likes = data.totalLikes
  }

  displayHome(photographers) {
    photographers.forEach((photographer) => {
      const Template = new PhotographerProfile(photographer)
      document
        .querySelector(".photographer_section")
        .appendChild(Template.createPhotographerCard())
    })
  }

  displayProfile() {
    //console.log(this)
    const Template = new PhotographerProfile(this)
    document
      .querySelector("#main")
      .appendChild(Template.createPhotographerHeader())
    Template.createprofilePageInsert(this.likes)
  }
}
