import { Image, Video } from "../../models/Media.js";

// Factory fonction qui crée un média image ou vidéo
export default class MediaFactory {
	constructor(data) {
		if (data.image) {
			return new Image(data);
		} else if (data.video) {
			return new Video(data);
		}
	}
}