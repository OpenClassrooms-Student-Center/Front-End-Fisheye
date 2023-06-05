const body = document.querySelector("body");
const main = document.querySelector("main");
const header = document.querySelector("header");
const mainButtons = main.querySelectorAll("button");
console.log(mainButtons);
const a = document.querySelector("a");


const lightboxModal = document.querySelector(".lightboxModal");

// modifie les attributs pour que la modale soit visible
function displayLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  a.setAttribute("aria-hidden", "true");
  a.setAttribute("tabindex", "-1");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "-1");
  });
  const formButton = document.querySelector(".contact__button");
  console.log(formButton);
  formButton.setAttribute("tabindex", "-1")
  mainButtons.forEach(function(button) {
    button.setAttribute("tabindex", "-1");
  });

  lightboxModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  lightboxModal.style.display = "flex";
}

function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "false");
  a.setAttribute("aria-hidden", "false");
  a.setAttribute("tabindex", "0");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });
  const formButton = document.querySelector(".contact__button");
  console.log(formButton);
  formButton.setAttribute("tabindex", "0")
  mainButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });

  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}

function closeLightbox() {
  const closeBtn = document.querySelector(".lightboxModal__close");
  closeBtn.addEventListener("click", function() {
    const lightboxFigure = document.querySelector(".lightboxModal__figure");
    // const lightboxVideo = document.querySelector(".lightboxModal__video");
    // if (lightboxImg) {lightboxImg.remove()}
    // else if (lightboxVideo) {lightboxVideo.remove()}
    if (lightboxFigure) {lightboxFigure.remove()}
    closeLightboxModal();
  })
}

export function disableLightboxButtons(index, mediasLength) {
  const previous = document.querySelector(".lightboxModal__previous");
  const next = document.querySelector(".lightboxModal__next");
  if (index === 0) {
    previous.style.display = "none";
    next.style.display = "block";
  } else if (index === mediasLength -1) {
    next.style.display = "none";
    previous.style.display = "block";
  } else {
    next.style.display = "block";
    previous.style.display = "block";
  }
}

export function initLightbox(){
  disableLightboxButtons()
  displayLightboxModal();
  closeLightbox();
}
