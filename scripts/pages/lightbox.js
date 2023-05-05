function initLightbox() {
  //
  let lightbox = document.getElementById("lightbox");
  lightbox.setAttribute("aria-label", "image closeup view");
  let figureBox = document.createElement("figure");
  figureBox.className = "figureLightbox";
  let captionBox = document.createElement("figcaption");
  captionBox.className = "captionLightbox";
  figureBox.appendChild(captionBox);
  lightbox.appendChild(figureBox);
  let lightboxMedia = document.querySelectorAll(".media");
  let lightboxImage = document.createElement("img");
  let lightboxVideo = document.createElement("video");
  let closeLightboxBtn = document.querySelector(".close-icon");
  closeLightboxBtn.setAttribute("aria-label", "Close dialog");
  let previousBtn = document.getElementById("previous");
  previousBtn.setAttribute("aria-label", "Previous image");
  let nextBtn = document.getElementById("next");
  nextBtn.setAttribute("aria-label", "Next image");

  let activeItemIndex;

  // Event listeners to open the lightbox
  document.querySelectorAll(".media").forEach((media, index) => {
    // Mouse
    media.addEventListener("click", (event) => {
      activeItemIndex = index;
      lightbox.classList.add("active");
      if (media.classList.contains("video")) {
        lightboxVideo.src = event.target.src;
        lightboxVideo.setAttribute("controls", true);
        figureBox.appendChild(lightboxVideo);
      } else {
        lightboxImage.src = event.target.src;
        figureBox.appendChild(lightboxImage);
      }
      captionBox.innerHTML = event.target.title;
    });
    // Keyboard
    media.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        lightbox.classList.add("active");
        if (media.classList.contains("video")) {
          lightboxVideo.src = event.target.src;
          lightboxVideo.setAttribute("controls", true);
          figureBox.appendChild(lightboxVideo);
        } else {
          lightboxImage.src = event.target.src;
          figureBox.appendChild(lightboxImage);
        }
        captionBox.innerHTML = event.target.title;
      } else if (event.key === "ArrowLeft") {
        goToPreviousImage(event);
      } else if (event.key === "ArrowRight") {
        goToNextImage(event);
      } else {
        event.key === "Escape";
        closeLightbox();
      }
    });
  });

  // Event Listeners to go to the previous or next image with mouse
  previousBtn.addEventListener("click", goToPreviousImage);
  nextBtn.addEventListener("click", goToNextImage);

  // Fonction goToNextImage
  function goToNextImage() {
    let lightboxMediaArray = Array.from(lightboxMedia);
    if (activeItemIndex === lightboxMediaArray.length - 1) {
      return;
    }
    let nextIndex = activeItemIndex + 1;
    let nextMedia = lightboxMediaArray[nextIndex];
    activeItemIndex = nextIndex;

    displayLightboxMedia(nextMedia);
  }

  // Fonction goToPreviousImage
  function goToPreviousImage() {
    let lightboxMediaArray = Array.from(lightboxMedia);
    if (activeItemIndex === 0) {
      return;
    }
    let previousIndex = activeItemIndex - 1;
    let previousMedia = lightboxMediaArray[previousIndex];

    activeItemIndex = previousIndex;
    displayLightboxMedia(previousMedia);
  }

  // Fonction to dislay the previous or next media
  function displayLightboxMedia(media) {
    lightboxImage.remove();
    lightboxVideo.remove();

    if (media.classList.contains(".video")) {
      lightboxVideo.src = media.src;
      lightboxVideo.setAttribute("controls", true);
      figureBox.appendChild(lightboxVideo);
    } else {
      lightboxImage.src = media.src;
      figureBox.appendChild(lightboxImage);
    }
    captionBox.innerHTML = media.title;
  }

  //Fonction to close the lightbox with mouse
  closeLightboxBtn.addEventListener("click", closeLightbox);
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.remove();
    lightboxVideo.remove();
  }
}
