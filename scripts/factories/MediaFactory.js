import Image from '../models/Image.js'
import Video from '../models/Video.js'

// Factory fonction qui crée un média image ou vidéo
export default class MediasFactory {
	constructor(data, type) {
		// Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
		if (type === 'Image') {
			return new Image(data)
		// Sinon retourne-moi le nouveau formatage
		} else if (type === 'Video') {
			return new Video(data)
		// Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
		} else {
			throw 'Unknown type format'
		}
	}
 }