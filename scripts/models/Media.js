/* Classe Media pour représenter une image ou une vidéo
 default : pour exporter uniquement la classe dans le document */
  
export default class Media {

	constructor(title, type, src) {
		this.title = title
		this.type = type
		this.src = src
	}

}
