import { Media } from "./Media.js"

export class VideoMedia extends Media {
  constructor(media) {
    super(media)
    this.video = media.video
  }

  createMedia(context) {
    return `<video aria-labelledby="media-${
      this.id
    }" tabindex="0" ${Media.addMediaClass(context)}>${this.title}
    <source src="assets/${this.photographerId}/${this.video}" type="video/mp4">
    </video><div ${Media.addMediaLegendClass(context)}><figcaption id="media-${
      this.id
    }">${this.title}</figcaption></div>`
  }
}
