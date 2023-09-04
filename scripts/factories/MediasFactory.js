import { Image, Video } from "../class/media.js";

// Factory function to create media with Image or Video Class
class MediasFactory {
  constructor(data) {
    if (data.image) {
      return new Image(data);
    } else if (data.video) {
      return new Video(data);
    } else {
      throw "Unknown data";
    }
  }
}

export { MediasFactory };
