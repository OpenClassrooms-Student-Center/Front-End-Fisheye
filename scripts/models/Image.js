import Media from "./Media.js";

export default class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
		this.src = `./assets/photographers/media/${this.image}`;
	}

	render() {
		const mediaWrapper = document.querySelector(".photograph-medias");
		const image = document.createElement("img");
		const imageCard = this.createCard();
		
		image.src = `./assets/photographers/media/${this.image}`;
		image.alt = this.title;

		imageCard.prepend(image);
		mediaWrapper.append(imageCard)

	}
}