import Media from "./Media.js";

export default class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
		this.src = `./assets/photographers/media/${this.image}`;
	}

	render() {
		const mediaWrapper = document.querySelector(".photograph-medias");
		const mediaLink = document.createElement("a");
		mediaLink.classList.add("media_link");
		const image = `<img src="${this.src}" alt="${this.title}"/>`
		const imageCard = this.createCard();

		mediaLink.href = "#";
		mediaLink.innerHTML = image;

		imageCard.prepend(mediaLink);
		mediaWrapper.append(imageCard);

	}
}