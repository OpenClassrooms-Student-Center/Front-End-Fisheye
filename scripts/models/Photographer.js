import { PhotographerProfile } from "../components/PhotographerProfile.js"

export class Photographer {
  constructor(data) {
    this.location = `${data.city}, ${data.country}`
    this.id = data.id
    this.name = data.name
    this.portrait = data.portrait
    this.price = data.price
    this.tagline = data.tagline
  }

  displayHome(photographers) {
    photographers.forEach((photographer) => {
      const Template = new PhotographerProfile(photographer)
      document
        .querySelector(".photographer_section")
        .appendChild(Template.createPhotographerCard())
    })
  }

  displayProfile(photographer) {
    const Template = new PhotographerProfile(photographer)
    document
      .querySelector("#main")
      .appendChild(Template.createPhotographerHeader())
  }
}
