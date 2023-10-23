class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }

  createLightbox() {
    const modalContent = document.querySelector("#modal-content");
    modalContent.classList.add("mx-auto", "my-0", "mySlides");

    // Create new elements for the media title and media
    const mediaTitleElement = document.createElement("h2");
    mediaTitleElement.innerHTML = this._media.title;

    if (this._media.image) {
      // If it's an image, create an <img> element
      const mediaImageElement = document.createElement("img");
      mediaImageElement.setAttribute("id", "modal-picture");
      const imagePath = `assets/images/${this._photographer.name}/${this._media.image}`;

      mediaImageElement.src = imagePath;
      mediaImageElement.alt = this._photographer.name;

      // Append the new elements to modalContent
      modalContent.appendChild(mediaImageElement);
    } else if (this._media.video) {
      // If it's a video, create a <video> element
      const mediaVideoElement = document.createElement("video");
      mediaVideoElement.setAttribute("id", "modal-video");
      const videoPath = `assets/images/${this._photographer.name}/${this._media.video}`;

      mediaVideoElement.src = videoPath;
      mediaVideoElement.controls = true;

      // Append the new elements to modalContent
      modalContent.appendChild(mediaVideoElement);
    }

    modalContent.appendChild(mediaTitleElement);
  }

  goToNextImage() {
    this._currentIndex = (this._currentIndex + 1) % this._mediaArray.length;
    this.createLightbox();
  }
}

export { Lightbox };
