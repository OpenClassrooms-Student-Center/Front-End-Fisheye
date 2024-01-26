import Media from "./Media.js";

export default class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
		/*this.photographer = data.photographer;*/
	}

	render() {
		const video = document.createElement("video");
		video.src = `assets/photographers/media/${this.video}`;
		video.alt = this.title;
	
		return video;
	}
}