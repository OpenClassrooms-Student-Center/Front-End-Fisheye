// Element
const sliderContainer = document.querySelector(".slider-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

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
