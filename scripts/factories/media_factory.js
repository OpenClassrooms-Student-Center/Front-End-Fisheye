import { ImageModel } from "../models/image.js";
import { VideoModel } from "../models/video.js";
import { MediaModel } from "../models/media.js";

export class MediaFactory {
  constructor(data) {
    if (data.image !== undefined) {
      this._data = new ImageModel(data);
    } else if (data.video !== undefined) {
      this._data = new VideoModel(data);
    }
    return new MediaModel(this._data);
  }
}
