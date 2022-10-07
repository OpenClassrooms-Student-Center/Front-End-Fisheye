import Image from './Image.js';
import Video from './Video.js';

export default class MediaFactory {
	static createMedia = (medias) => {
		const mediaTarget = document.getElementById('gallery');

		medias.forEach(element => {
			if(element.image) {
				return new Image(element, mediaTarget);
			} else {
				return new Video(element, mediaTarget);
			}
		});
	}
}
