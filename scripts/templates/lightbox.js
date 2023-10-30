class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }

  createLightbox(media, photographer) {
    console.log("photographer", photographer.name);
    console.log("media", media);

    const carouselWrapper = document.querySelector("#modal-wrapper");
    // Create a ul
    const carouselContainer = document.createElement("ul");
    carouselContainer.classList.add("carousel");

    const carouselElements = document.createElement("div");
    carouselElements.classList.add("carousel-elements");

    const carouselArrows = document.createElement("div");
    carouselArrows.classList.add("carousel-arrows");

    media.forEach((mediaItem) => {
      const carouselLi = document.createElement("li");
      carouselLi.classList.add("carousel-item");

      const carouselTitle = document.createElement("h2");
      carouselTitle.classList.add("carousel-title");

      carouselTitle.innerHTML = mediaItem.title;

      if (mediaItem.image) {
        const carouselImg = document.createElement("img");
        carouselImg.innerHTML = "Type: Image";
        console.log(mediaItem.image);
        const mediaPath = `assets/images/${photographer.name}/${mediaItem.image}`;
        carouselImg.classList.add("carousel-media");

        carouselImg.setAttribute("id", `media-${media.id}`);
        carouselImg.innerHTML = "Type: Image";
        carouselImg.src = mediaPath;
        carouselImg.alt = media.title;

        carouselLi.appendChild(carouselImg);
      } else if (mediaItem.video) {
        const carouselVideo = document.createElement("video");
        carouselVideo.innerHTML = "Type: Video";
        console.log(mediaItem.video);
        const mediaPath = `assets/images/${photographer.name}/${mediaItem.video}`;
        carouselVideo.classList.add("carousel-media");

        carouselVideo.setAttribute("id", `media-${media.id}`);
        carouselVideo.innerHTML = "Type: Video";
        carouselVideo.src = mediaPath;
        carouselVideo.alt = media.title;

        carouselContainer.classList.add("carousel-item");

        carouselLi.appendChild(carouselVideo);
      }
      carouselElements.appendChild(carouselTitle);
      carouselLi.appendChild(carouselTitle);
      carouselContainer.appendChild(carouselLi);
      carouselWrapper.appendChild(carouselContainer);
    });
  }

  //2ndlevel
  // carouselContainer.appendChild(mediaImg);
  //1st level
}

export { Lightbox };
