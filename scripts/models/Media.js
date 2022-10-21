import { PhotographerMedia } from "../components/PhotographerMedia.js"


export class Media {
  constructor(media) {
    this.date = media.date
    this.id = media.id
    this.image = media.image
    this.likes = media.likes
    this.photographerId = media.photographerId
    this.price = media.price
    this.title = media.title
  }

static createMediaSection() {
  const newSection = document.createElement("section")
  newSection.classList = "photographer-media"
  document.querySelector("#main").appendChild(newSection)
}

  displayMedia(media) {
    // console.log(media)
    const Template = new PhotographerMedia(media)
    document
      .querySelector(".photographer-media")
      .appendChild(Template.createMediaList())
  }
}