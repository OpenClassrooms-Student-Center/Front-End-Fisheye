import Photo from '../model/CardPhoto.js';
import Video from '../model/CardVideo.js';

export default function PhotoFactory(media, name) {
  if (media.image) {
    return new Photo(media, name);
  } if (media.video) {
    return new Video(media, name);
  }
  return null;
}
