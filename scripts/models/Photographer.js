import { PhotographerMedia } from "../components/PhotographerMedia.js"
import { PhotographerProfile } from "../components/PhotographerProfile.js"
import { MediaFactory } from "../factories/mediaFactory.js"
import { Media } from "./Media.js"

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

  displayProfile(data) {
    const Template = new PhotographerProfile(data.photographer)
    document
      .querySelector("#main")
      .appendChild(Template.createPhotographerHeader())
    const newPhotographerMedia = new PhotographerMedia()
    newPhotographerMedia.createDropdownOrder()
    newPhotographerMedia.createMediaSection()
    const photographerMedias = data.media.map(
      (media) => new MediaFactory(media)
    )
    photographerMedias.forEach((element) => {
      new Media(element).displayMedia(element)
    })
    Template.createprofilePageInsert()
  }
}
