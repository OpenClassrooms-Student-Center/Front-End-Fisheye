import {
  MediaImg,
  MediaVideo,
} from "../components/photographerMedias/index.js";

export class MediasFactory {
  constructor(media, photographeName) {
    if (media.image == undefined) {
      return new MediaVideo(media, photographeName);
    } else {
      return new MediaImg(media, photographeName);
    }
  }
}
