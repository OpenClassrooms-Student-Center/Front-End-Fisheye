import { Media } from "./Media.js"

export class PhotoMedia extends Media {
  constructor(media) {
    super(media)
    this.image = media.image
  }

  createMedia(context) {
    return `<img tabindex="0" ${Media.addMediaClass(context)} src="assets/${this.photographerId}/${this.image}" aria-labelledby="media-${this.id}" ><div ${Media.addMediaLegendClass(context)}><figcaption id="media-${this.id}">${
      this.title
    }</figcaption></div>`
  }
}
