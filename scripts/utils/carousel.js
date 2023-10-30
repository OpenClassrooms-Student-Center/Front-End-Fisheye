// Global var
const prevBtn = document.querySelector("fa-arrow-circle-left");
console.log(".prevBtn", prevBtn);
const nextBtn = document.querySelector(".fa-arrow-circle-right");
const carouselItems = document.querySelectorAll(".carousel-item");
const carouselPauseBtn = document.querySelector(".carousel-pause-btn");

let currentItemPosition = 0;
let carouselInterval;

// Funcs
const goToNextSlide = () => {
  if (currentItemPosition + 1 >= carouselItems.length) {
    const lastItem = carouselItems[currentItemPosition];
    currentItemPosition = 0;
    const currentItem = carouselItems[currentItemPosition];
    setNodeAttributes(lastItem, currentItem);
  } else {
    currentItemPosition += 1;
    const lastItem = carouselItems[currentItemPosition - 1];
    const currentItem = carouselItems[currentItemPosition];
    setNodeAttributes(lastItem, currentItem);
  }
};

const goToPreviousSlide = () => {
  if (currentItemPosition - 1 >= 0) {
    currentItemPosition -= 1;
    const currentItem = carouselItems[currentItemPosition];
    const lastItem = carouselItems[currentItemPosition + 1];
    setNodeAttributes(lastItem, currentItem);
  } else {
    const lastItem = carouselItems[currentItemPosition];
    currentItemPosition = 2;
    const currentItem = carouselItems[currentItemPosition];
    setNodeAttributes(lastItem, currentItem);
  }
};

const setNodeAttributes = (lastItem, currentItem) => {
  lastItem.style.display = "none";
  lastItem.setAttribute("aria-hidden", "true");
  currentItem.style.display = "block";
  currentItem.setAttribute("aria-hidden", "false");
};

// Events
prevBtn.addEventListener("click", function () {
  goToPreviousSlide();
});

nextBtn.addEventListener("click", function () {
  goToNextSlide();
});

document.addEventListener("keydown", function (e) {
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

document.addEventListener("DOMContentLoaded", function () {
  carouselInterval = setInterval(goToNextSlide, 5000);
});
