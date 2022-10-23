import { Media } from "./Media.js"

export class VideoMedia extends Media {
  constructor(media) {
    super(media)
    this.video = media.video
  }
}
