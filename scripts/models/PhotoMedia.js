import { Media } from "./Media.js"

export class PhotoMedia extends Media {
  constructor(media) {
    super(media)
    this.image = media.image
  }

  createMedia(context) {
    return `<img tabindex="0" ${Media.addMediaClass(context)} src="assets/${this.photographerId}/${this.image}" alt="${this.title}" ><div ${Media.addMediaLegendClass(context)}><figcaption>${
      this.title
    }</figcaption></div>`
  }
}
