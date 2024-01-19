import Media from "./Media.js";

export default class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
	}

	render() {
		
	}
}