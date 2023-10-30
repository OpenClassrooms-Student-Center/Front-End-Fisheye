class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }

  createLightbox(media, photographer) {
    console.log("photographer", photographer.name);
    console.log("media", media);
    const modalContent = document.querySelector(".photo-modal");
    media.forEach((mediaItem) => {
      if (mediaItem.image) {
        console.log(mediaItem.image);
        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox");

        lightboxContainer.innerHTML = `
        <div class="carousel">
          <h1>${mediaItem.id}</h1>
          <ul class="carousel" aria-label="Our selection of Recipes">
            <li class="carousel-item item-0" aria-hidden="false">
              <div role="button" class="controls controls-left">
                <span class="img prev-image">
                  <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
                </span>
                <p class="sr-only">Previous</p>
              </div>
              <div role="button" class="controls controls-right">
                <span class="img next-image">
                  <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
                </span>
                <p class="sr-only">Next</p>
              </div>
              <div class="caroussel-title">
              <h2>${mediaItem.title}</h2>
              <img id="about-photographer-${mediaItem.id}" src="assets/images/${photographer.name}/${mediaItem.image}" alt="${mediaItem.title}" class="rounded-circle order-md-1 order-lg-2" width="200px" height="200px">
              </div>
            </li>
          </ul>
          <div>
            <button class="carousel-pause-btn">Pause carousel</button>
          </div>
        </div>
      `;
        modalContent.appendChild(lightboxContainer);
      } else if (mediaItem.video) {
        console.log(mediaItem.video);
        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox");

        lightboxContainer.innerHTML = `
        <div class="carousel">
          <h1>${mediaItem.id}</h1>
          <ul class="carousel" aria-label="Our selection of Recipes">
            <li class="carousel-item item-0" aria-hidden="false">
              <div role="button" class="controls controls-left">
                <span class="img prev-image">
                  <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
                </span>
                <p class="sr-only">Previous</p>
              </div>
              <div role="button" class="controls controls-right">
                <span class="img next-image">
                  <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
                </span>
                <p class="sr-only">Next</p>
              </div>
              <div class="caroussel-title">
              <h2>${mediaItem.title}</h2>
              <img id="about-photographer-${mediaItem.id}" src="assets/images/${photographer.name}/${mediaItem.video}" alt="${mediaItem.title}" class="rounded-circle order-md-1 order-lg-2" width="200px" height="200px">
              </div>
            </li>
          </ul>
          <div>
            <button class="carousel-pause-btn">Pause carousel</button>
          </div>
        </div>
      `;
        modalContent.appendChild(lightboxContainer);
      }
    });
  }
}

export { Lightbox };
