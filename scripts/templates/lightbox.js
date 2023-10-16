import { onOpenPic } from "../utils/photoModal.js"; // Import openModalBtn here

class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }
  createLightbox(media, photographer) {
    const imagePath = `assets/images/${photographer.name}/${media.image}`;

    const modalContent = document.querySelector("#modalContent");
    // Create a <p> element for the media title
    const mediaTitleElement = document.createElement("h2");
    mediaTitleElement.innerHTML = media.title;

    //   append to link
    const mediaImageElement = document.createElement("img");
    mediaImageElement.setAttribute("id", "modal-picture");

    mediaImageElement.src = imagePath;
    mediaImageElement.alt = photographer.name;

    modalContent.appendChild(mediaImageElement);
    modalContent.appendChild(mediaTitleElement);
    onOpenPic(media);
  }
}
export { Lightbox };
