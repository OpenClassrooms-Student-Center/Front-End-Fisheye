// Element
const sliderContainer = document.querySelector(".slider-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Set Attribute
prevButton.setAttribute("tabindex", 0);
nextButton.setAttribute("tabindex", 0);

// Slider
setTimeout(() => {
  let slideIndex = 0;
  const slides = sliderContainer.querySelectorAll(".slider-content > div");
  const slideCount = slides.length;
  const lighthox = document.querySelector("#lightbox");

  // Ouvrir l'image cliqué dans la Lightbox
  const mediaSrc = document.querySelectorAll(".media");
  mediaSrc.forEach((el) => {
    el.addEventListener("click", () => {
      lighthox.style.display = "flex";
      slideIndex = (slideIndex + el.getAttribute("data-id")) % slideCount;
      updateSlider();
    });

    el.addEventListener("keypress", function (event) {
      switch (event.key) {
        case "Enter":
          lighthox.style.display = "flex";
          slideIndex = (slideIndex + el.getAttribute("data-id")) % slideCount;
          updateSlider();
          break;
      }
    });
  });

  // Image précédente dans la lightbox au click
  function prev() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Image suivante dans la lightbox au click
  function next() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
  }

  prevButton.addEventListener("click", prev);
  nextButton.addEventListener("click", next);

  // Slide lightbox avec fleche du clavier
  document.onkeydown = function (e) {
    if (lighthox.getAttribute("style") === "display: flex;") {
      switch (e.keyCode) {
        case 37:
          prev();
          break;
        case 39:
          next();
          break;
        case 27:
          lighthox.style.display = "none";
          break;
      }
    }
  };

  // Mis à jour du Slider en fonction du bouton NEXT ou PREV click
  function updateSlider() {
    const selectedSlide = slides[slideIndex];
    const scrollPosition =
      selectedSlide.offsetLeft - sliderContainer.offsetLeft;
    sliderContainer.scrollTo({ left: scrollPosition });
  }

  updateSlider();
}, 1000);
