import Media from "./Media.js";

export default class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
	}

	render() {

	}
	
}