const body = document.querySelector("body");
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const lightboxModal = document.querySelector(".lightboxModal");
const mainButtons = main.querySelectorAll("button");
const a = document.querySelector("a");

function renderLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  footer.setAttribute("aria-hidden", "true");
  a.setAttribute("aria-hidden", "true");
  a.setAttribute("tabindex", "-1");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "-1");
  });
  const formButton = document.querySelector(".contact__button");
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
  footer.setAttribute("aria-hidden", "false");
  a.setAttribute("aria-hidden", "false");
  a.setAttribute("tabindex", "0");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });
  const formButton = document.querySelector(".contact__button");
  formButton.setAttribute("tabindex", "0")
  mainButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });

  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}

function closeLightboxOnClick() {
  const closeBtn = document.querySelector(".lightboxModal__close");
  closeBtn.addEventListener("click", function() {
    const lightboxFigure = document.querySelector(".lightboxModal__figure");
    if (lightboxFigure) {lightboxFigure.remove()}
    closeLightboxModal();
  })
}

function closeLightboxWithEsc() {
  document.addEventListener('keydown', event => {
      const code = event.code
      if (lightboxModal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
          closeLightboxModal()
      }
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
  renderLightboxModal();
  closeLightboxOnClick();
  closeLightboxWithEsc();
}
