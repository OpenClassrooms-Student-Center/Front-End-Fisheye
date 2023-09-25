import { Image, Video } from "../class/media.js";

// Factory function to create media with Image or Video Class
class MediasFactory {
  static createMedia(data) {
    if (data.image) {
      return new Image(data);
    } else if (data.video) {
      return new Video(data);
    } else {
      throw new Error("Unknown data");
    }
  }
}

export { MediasFactory };
