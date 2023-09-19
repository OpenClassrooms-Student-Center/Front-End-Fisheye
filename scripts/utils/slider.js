// Element
const lighthox = document.querySelector("#lightbox");
const close = document.querySelector(".close");
const card = document.querySelector(".card");
const sliderContainer = document.querySelector(".slider-container");
const sliderContent = document.querySelector(".slider-content");
const allContent = document.querySelectorAll(".photographer-media");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Create element
const videoElement = document.createElement("video");
const source = document.createElement("source");
const title = document.createElement("div");

// Slider
setTimeout(() => {
  let slideIndex = 0;
  const slides = sliderContainer.querySelectorAll(".slider-content > div");
  const slideCount = slides.length;

  prevButton.addEventListener(["click"], () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
  });

  function updateSlider() {
    const selectedSlide = slides[slideIndex];
    const scrollPosition =
      selectedSlide.offsetLeft - sliderContainer.offsetLeft;
    sliderContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }

  updateSlider();
}, 1000);
