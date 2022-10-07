import Image from './Image.js';
import Video from './Video.js';

export default class MediaFactory {
  static createMedia = (medias) => {
    const mediaTarget = document.getElementById('gallery');
    medias.forEach(media => {
      if (media.image) {
        return new Image(media, mediaTarget);
      } else {
        return new Video(media, mediaTarget);
      }
    });
  };
}
