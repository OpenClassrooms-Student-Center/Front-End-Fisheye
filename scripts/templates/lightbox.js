class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }

  createLightbox(media, photographer) {
    const modalContent = document.querySelector("#modal-content");
    const lightboxContainer = document.createElement("div");
    lightboxContainer.classList.add("lightbox");

    lightboxContainer.innerHTML = `
      <div class="carousel">
        <h1>Your</h1>
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
              <h2>Item 1</h2>
            </div>
          </li>
          <li class="carousel-item item-1" aria-hidden="true">
            <div role="button" class="controls controls-left">
              <span class="img prev-image">
                <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
              </span>
              <p class="sr-only">Previous</p>
            </div>
            <div role="button" class "controls controls-right">
              <span class="img next-image">
                <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
              </span>
              <p class="sr-only">Next</p>
            </div>
            <div class="caroussel-title">
              <h2>Item 2</h2>
            </div>
          </li>
          <li class="carousel-item item-2" aria-hidden="true">
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
              <h2>${this._photographer.name}</h2>
              <img id="about-photographer-img" src="assets/img/Photographers_ID_Photos/${this._photographer.portrait}" alt="${this._photographer.name}" class="rounded-circle order-md-1 order-lg-2" width="200px" height="200px">
            </div>
          </li>
        </ul>
        <div>
          <button class="carousel-pause-btn">Pause carousel</button>
        </div>
      </div>
    `;

    modalContent.appendChild(lightboxContainer);

    // Global var
    const prevBtn = $(".prev-image"); // Wrap the selector with $()
    const nextBtn = $(".next-image"); // Wrap the selector with $()
    const carouselItems = ".carousel-item";
    const carouselPauseBtn = ".carousel-pause-btn";

    let currentItemPosition = 0;
    let carouselInterval;

    // Funcs
    const goToNextSlide = () => {
      if (currentItemPosition + 1 >= $(carouselItems).length) {
        // Wrap carouselItems with $()
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = 0;
        const currentItem = `.item-${currentItemPosition}`;

        setNodeAttributes(lastItem, currentItem);
      } else {
        currentItemPosition += 1;
        const lastItem = `.item-${currentItemPosition - 1}`;
        const currentItem = `.item-${currentItemPosition}`;

        setNodeAttributes(lastItem, currentItem);
      }
    };

    const goToPreviousSlide = () => {
      if (currentItemPosition - 1 >= 0) {
        currentItemPosition -= 1;
        const currentItem = `.item-${currentItemPosition}`;
        const lastItem = `.item-${currentItemPosition + 1}`;

        setNodeAttributes(lastItem, currentItem);
      } else {
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = 2;
        const currentItem = `.item-${currentItemPosition}`;

        setNodeAttributes(lastItem, currentItem);
      }
    };

    const setNodeAttributes = (lastItem, currentItem) => {
      $(lastItem).css("display", "none");
      $(currentItem).css("display", "block");
      $(lastItem).attr("aria-hidden", "true");
      $(currentItem).attr("aria-hidden", "false");
    };

    // Events
    prevBtn.click(function () {
      goToPreviousSlide();
    });

    nextBtn.click(function () {
      goToNextSlide();
    });

    $(document).keydown(function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;

      if (keyCode === 39) {
        goToNextSlide();
      } else if (keyCode === 37) {
        goToPreviousSlide();
      }
    });

    carouselPauseBtn.addEventListener("click", function () {
      clearInterval(carouselInterval);
    });

    $(document).ready(function () {
      carouselInterval = setInterval(() => goToNextSlide(), 5000);
    });
  }
}

export { Lightbox };
