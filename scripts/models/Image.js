import Media from "./Media.js";

export default class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
		this.src = `./assets/photographers/media/${this.image}`;
	}
/*
	render() {

		const image = document.createElement("img");
		image.src = `./assets/photographers/media/${this.image}`;
		image.alt = this.title;

		const card = this.createCard();

		card.prepend(image);

		return card;
	}
	*/
}