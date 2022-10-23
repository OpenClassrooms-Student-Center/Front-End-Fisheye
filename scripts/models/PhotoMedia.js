import { Media } from "./Media.js"

export class PhotoMedia extends Media {
  constructor(media) {
    super(media)
    this.photo = media.image
  }
}
