// Global DOM var
const body = document.body;
const openPicBtn = document.querySelector(".media-img");
const mainWrapper = document.querySelector(".main-wrapper");
const modal = document.querySelector(".photo_modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const nextImage = document.querySelector(".next-image");

// Func
export async function onOpenPic() {
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
}

const onClosePic = () => {
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modal.style.display = "none";
};

const goToNextSlide = () => {
  console.log(1);
};

const goToPreviousSlide = () => {};
// Event
openPicBtn ? openPicBtn.addEventListener("click", onOpenPic) : null;
// Event
modalCloseBtn.addEventListener("click", onClosePic);

nextImage.addEventListener("click", goToNextSlide);

// Close modal when escape key is pressed
document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (modal.getAttribute("aria-hidden") === "false" && keyCode === 27) {
    onClosePic();
  }
});

document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;

  if (keyCode === 39) {
    goToNextSlide();
  } else if (keyCode === 37) {
    goToPreviousSlide();
  }
});

// carouselPauseBtn.addEventListener("click", function () {
//   clearInterval(carouselInterval);
// });

// document.addEventListener("keydown", (e) => {
//   const keyCode = e.keyCode ? e.keyCode : e.which;
//   if (keyCode === 39) {
//     goToNextSlide();
//   } else if (keyCode === 37) {
//     goToPreviousSlide();
//   }
// });

// carouselPauseBtn.addEventListener("click", function () {
//   clearInterval(carouselInterval);
// });
