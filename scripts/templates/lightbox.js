class Lightbox {
  constructor(media, photographer, lightbox) {
    this._media = media;
    this._photographer = photographer;
    this._lightbox = lightbox;
    this._currentIndex = 0; // Initialize with the first image (index 0)
  }
  createLightbox(media, photographer, lightbox) {
    console.log("lightbox", lightbox);
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
  goToNextImage() {
    this._currentIndex = (this._currentIndex + 1) % this._mediaArray.length;
    this.createLightbox();
  }
}
export { Lightbox };
