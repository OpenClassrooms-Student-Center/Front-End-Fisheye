import { PhotographerMedia } from "../components/PhotographerMedia.js"

export class Media {
  constructor(media) {
    this.date = media.date
    this.id = media.id
    this.likes = media.likes
    this.photographerId = media.photographerId
    this.price = media.price
    this.title = media.title
  }

  displayMedia(media) {
    const Template = new PhotographerMedia(media)
    document
      .querySelector(".photographer-media")
      .appendChild(Template.createMediaList(media))
  }
}
