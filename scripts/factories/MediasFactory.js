import { Image, Video } from "../../models/Media.js";

// Factory fonction qui crée un média image ou vidéo
export default class MoviesFactory {
	constructor(data, type) {
		// Si le type correspond à image, alors retourne-moi un objet image
		if (type === 'image') {
			return new Image(data)
		// Sinon retourne-moi un objet video
		} else if (type === 'video') {
			return new Video(data)
		// Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
		} else {
			throw 'Unknown type format'
		}
	}
 }