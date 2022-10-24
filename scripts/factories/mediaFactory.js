import { PhotoMedia } from "../models/PhotoMedia.js"
import { VideoMedia } from "../models/VideoMedia.js"

export class MediaFactory {
  constructor(media) {
    if (Object.keys(media).includes("image")) {
      return new PhotoMedia(media)
    } else if (Object.keys(media).includes("video")) {
      return new VideoMedia(media)
    } else {
      throw "Error"
    }
  }
}
