import Media from "./Media.js";

export default class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
		this.src = `./assets/photographers/media/${this.video}`;
	}

	render() {
		const mediaWrapper = document.querySelector(".photograph-medias");
		const mediaLink = document.createElement("a");
		const video = `<video src="${this.src}"/>`
		const videoCard = this.createCard();

		mediaLink.classList.add("media_link");
		mediaLink.href = "#";
		mediaLink.innerHTML = video;

		videoCard.prepend(mediaLink);
		mediaWrapper.append(videoCard);
	}
	
}