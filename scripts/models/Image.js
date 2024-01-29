import Media from "./Media.js";

export default class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
	}

	render() {

		const image = document.createElement("img");
		image.src = `assets/photographers/media/${this.image}`;
		image.alt = this.title;

		const mediaCard = this.createCard();
		
		// Ajouter l'image au début de mediaCard
        mediaCard.prepend(image);

		console.log(mediaCard);
        return mediaCard;
	}
	
}