import { Media } from "../models/Media.js"
import { PhotoMedia } from "../models/PhotoMedia.js"
import { VideoMedia } from "../models/VideoMedia.js"

// export class MediaFactory {
//   constructor(media) {
//     let mediaType
//       if (Object.keys(media).includes("image")) {
//         mediaType = "image"
//         return new PhotoMedia(media).displayMedia(media)
//       } else if (Object.keys(media).includes("video")) {
//         mediaType = "video"
//         return new VideoMedia(media).displayMedia(media)
//       }
//       else {
//         throw "Error"
//       }
//   }
// }

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
