import { MediaModel } from "../models/media.js";

export class ImageModel extends MediaModel {
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  _setImage(path, image, title) {
    const img = document.createElement("img");
    img.setAttribute("src", path + image)
    img.setAttribute("alt", title)
  }

  getMedia() {
    const figure = document.createElement("figure");
    const imageElement = _setImage(this.path, this._image, this.title)
    figure.classList.add('media');
    figure.append(imageElement)
  }
}
