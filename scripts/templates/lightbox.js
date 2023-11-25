import { closePhotoModal } from "../utils/contactForm.js";
import { onOpenPic } from "../utils/photoModal.js";

class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
    this.currentIndex = 0;
  }

  createLightbox(media, photographer, mediaId) {
    console.log(mediaId);

    let selectedMedia;
    let selectedMediaArray = [];

    media.forEach((mediaItem) => {
      if (mediaItem.id === mediaId) {
        selectedMedia = mediaItem;
        console.log("selectedMedia", selectedMedia);
        selectedMediaArray.unshift(selectedMedia);
        console.log(selectedMediaArray);
      }
      return;
    });

    const carouselWrapper = document.querySelector("#modal-wrapper");
    // Create a ul
    const carouselContainer = document.createElement("ul");
    carouselContainer.classList.add("carousel");

    const carouselControls = document.createElement("div");
    carouselControls.classList.add("controls");

    const closingModal = document.createElement("img");
    closingModal.setAttribute("id", "modalClose");
    closingModal.src = "assets/icons/close.svg";
    closingModal.onclick = closePhotoModal;

    const controlsPrevious = document.createElement("img");
    // controlsPrevious.src = `assets/images/Photographers ID Photos/${photographer._portrait}`;
    controlsPrevious.alt = `${photographer._name}`;
    controlsPrevious.classList.add("controls-previous", "controls");

    const spanPrevious = document.createElement("span");
    spanPrevious.classList.add("previous-img");
    const spanNext = document.createElement("span");
    spanNext.classList.add("next-img");

    const controlsNext = document.createElement("img");
    controlsNext.classList.add("controls-next", "controls");

    const carouselElements = document.createElement("div");
    carouselElements.classList.add("carousel-elements");

    const carouselArrows = document.createElement("div");
    carouselArrows.classList.add("carousel-arrows");

    let currentIndex = 0;

    controlsNext.addEventListener("click", () => {
      // Hide the current li
      const currentLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      );
      if (currentLi) {
        currentLi.style.display = "none";
      }

      currentIndex++; // Increment the current index

      // If we reach the end, loop back to the beginning
      if (currentIndex >= media.length) {
        currentIndex = 0;
      }

      // Display the new li
      const newLi = carouselContainer.querySelector(
        `.carousel-item-${currentIndex}`
      );
      if (newLi) {
        newLi.style.display = "flex";
      }
    });

    media.forEach((mediaItem, index) => {
      const carouselLi = document.createElement("li");
      carouselLi.classList.add("carousel-item-" + (index + 1));
      carouselLi.classList.add("carousel-block");

      // Set aria-hidden based on the index
      carouselLi.style.display = index === 0 ? "flex" : "none";

      const carouselTitle = document.createElement("h2");
      carouselTitle.classList.add("carousel-title");

      carouselTitle.innerHTML = selectedMedia.title;

      if (mediaItem.image) {
        const carouselImg = document.createElement("img");
        carouselImg.innerHTML = "Type: Image";

        const mediaPath = `assets/images/${photographer.name}/${selectedMedia.image}`;
        console.log(mediaPath);
        carouselImg.classList.add("carousel-media");

        carouselImg.setAttribute("id", `media-${mediaItem.image}`);
        carouselImg.innerHTML = "Type: Image";
        carouselImg.src = mediaPath;
        carouselImg.alt = mediaItem.title;
        carouselImg.onClick = onOpenPic();

        carouselLi.appendChild(carouselImg);
      } else if (mediaItem.video) {
        const carouselVideo = document.createElement("video");
        carouselVideo.innerHTML = "Type: Video";
        // const mediaPath = `assets/images/${photographer.name}/${mediaItem.video}`;
        carouselVideo.classList.add("carousel-media");

        // carouselVideo.setAttribute("id", `media-${mediaId}`);
        carouselVideo.innerHTML = "Type: Video";
        carouselVideo.src = mediaPath;
        carouselVideo.alt = mediaItem.title;

        carouselLi.appendChild(carouselVideo);
      }
      carouselElements.appendChild(carouselTitle);
      carouselLi.appendChild(carouselTitle);
      carouselContainer.appendChild(carouselLi);

      controlsNext.appendChild(spanPrevious);
      controlsPrevious.appendChild(spanPrevious);
      carouselControls.appendChild(controlsNext);
      carouselControls.appendChild(controlsPrevious);

      carouselWrapper.appendChild(closingModal);
      carouselWrapper.appendChild(carouselControls);
      carouselWrapper.appendChild(carouselContainer);
    });
    return carouselContainer;
  }

  //2ndlevel
  // carouselContainer.appendChild(mediaImg);
  //1st level
}

export { Lightbox };
