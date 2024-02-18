import Media from "./Media.js";

export default class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
		this.src = `./assets/photographers/media/${this.video}`;
	}

	render() {
		const mediaWrapper = document.querySelector(".photograph-medias");
		const video = document.createElement("video");
		video.src = `./assets/photographers/media/${this.video}`;
		video.alt = this.title;
	
		const videoCard = this.createCard();

		videoCard.prepend(video);
		mediaWrapper.append(videoCard)

	}
	
}