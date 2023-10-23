class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }
  createLightbox(media, photographer) {
    // ---------------------------------------------------------
    const mediaTypeElement = document.createElement("p");

    if (media.image) {
      mediaTypeElement.innerHTML = "Type: Image";
      // Construct the path to the image using the correct folder structure
      const imagePath = `assets/images/${photographer.name}/${media.image}`;

      // Create an <img> element for displaying the image
      const imageElement = document.createElement("img");

      imageElement.src = imagePath;
      imageElement.alt = media.image;
      imageElement.setAttribute("id", `media-img-${media.id}`);
      imageElement.onclick = onOpenPic;
      imageElement.addEventListener("click", () => {
        // Create a new Lightbox instance with the clicked media
        const lightbox = new Lightbox(media, photographer);

        // Call a method to open the lightbox (you need to implement this in the Lightbox class)
        lightbox.createLightbox(media, photographer, lightbox);
      });

      // Append the image element to the mediaImg container
      mediaImg.appendChild(imageElement);
    } else if (media.video) {
      mediaTypeElement.innerHTML = "Type: Video";
      // Construct the path to the video using the correct folder structure
      const videoPath = `assets/images/${photographer.name}/${media.video}`;

      // Create a <video> element for displaying the video
      const videoElement = document.createElement("video");
      videoElement.src = videoPath;
      videoElement.controls = true;

      // Append the video element to the mediaImg container
      mediaImg.appendChild(videoElement);
    }
    // ---------------------------------------------------------

    const imagePath = `assets/images/${photographer.name}/${media.image}`;

    const modalContent = document.querySelector("#modalContent");
    modalContent.classList.add("mx-auto", "my-0", "mySlides");

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
