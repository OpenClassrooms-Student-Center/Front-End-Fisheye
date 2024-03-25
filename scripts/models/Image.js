import Media from "./Media.js";

export default class Image extends Media {
	constructor (data) {
		super(data);
		this.image = data.image;
		this.src = `./assets/photographers/media/${this.image}`;
	}

	render () {
		const mediaWrapper = document.querySelector(".photograph-medias");
		const mediaLink = document.createElement("a");
		const image = `<img src="${this.src}" alt="${this.title}"/>`;
		const imageCard = this.createCard();

		mediaLink.classList.add("media_link");
		mediaLink.href = "#";
		mediaLink.innerHTML = image;

		imageCard.prepend(mediaLink);
		mediaWrapper.append(imageCard);
	}
}
