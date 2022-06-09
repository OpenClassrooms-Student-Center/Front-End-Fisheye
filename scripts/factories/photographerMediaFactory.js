import {
  MediaImg,
  MediaVideo,
} from "../components/photographerMedias/index.js";

export class MediasFactory {
  constructor(media, photographeName) {
    if (media.image == undefined) {
      console.log("je suis ici avec video :::> ");
      return new MediaVideo(media, photographeName);
    } else {
      return new MediaImg(media, photographeName);
    }
  }
}
