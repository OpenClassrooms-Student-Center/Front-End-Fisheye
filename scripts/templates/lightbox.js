class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }

  createLightbox(media, photographer) {
    const modalContent = document.querySelector("#modal-content");
    modalContent.classList.add("mx-auto", "my-0", "mySlides");

    // Create new elements for the media title and media
    const mediaTitleElement = document.createElement("h2");
    mediaTitleElement.innerHTML = media.title;

    if (media.image) {
      // If it's an image, create an <img> element
      const mediaImageElement = document.createElement("img");
      mediaImageElement.setAttribute("id", "modal-picture");
      const imagePath = `assets/images/${photographer.name}/${media.image}`;

      mediaImageElement.src = imagePath;
      mediaImageElement.alt = photographer.name;

      // Append the new elements to modalContent
      modalContent.appendChild(mediaImageElement);
    } else if (media.video) {
      // If it's a video, create a <video> element
      const mediaVideoElement = document.createElement("video");
      mediaVideoElement.setAttribute("id", "modal-video");
      const videoPath = `assets/images/${photographer.name}/${media.video}`;

      mediaVideoElement.src = videoPath;
      mediaVideoElement.controls = true;

      // Append the new elements to modalContent
      modalContent.appendChild(mediaVideoElement);
    }

    modalContent.appendChild(mediaTitleElement);
  }

  goToNextImage() {
    currentIndex = (currentIndex + 1) % mediaArray.length;
    this.createLightbox();
  }
}

export { Lightbox };
