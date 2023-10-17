import { onOpenPic } from "../utils/photoModal.js";

class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }
  createLightbox(media, photographer) {
    const imagePath = `assets/images/${photographer.name}/${media.image}`;

    const modalContent = document.querySelector("#modalContent");

    // Find and remove the old mediaTitleElement and mediaImageElement
    const oldMediaTitleElement = modalContent.querySelector("h2");
    if (oldMediaTitleElement) {
      modalContent.removeChild(oldMediaTitleElement);
    }

    const oldMediaImageElement = modalContent.querySelector("#modal-picture");
    if (oldMediaImageElement) {
      modalContent.removeChild(oldMediaImageElement);
    }

    // Create new elements for the media title and image
    const mediaTitleElement = document.createElement("h2");
    mediaTitleElement.innerHTML = media.title;

    const mediaImageElement = document.createElement("img");
    mediaImageElement.setAttribute("id", "modal-picture");
    mediaImageElement.src = imagePath;
    mediaImageElement.alt = photographer.name;

    // Append the new elements to modalContent
    modalContent.appendChild(mediaImageElement);
    modalContent.appendChild(mediaTitleElement);
  }
}
export { Lightbox };
