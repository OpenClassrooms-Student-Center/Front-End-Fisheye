const body = document.querySelector("body");
const main = document.querySelector("#main");
const lightboxModal = document.querySelector(".lightboxModal");

function displayLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  lightboxModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  lightboxModal.style.display = "flex";
}

function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}

function closeLightbox() {
  const closeBtn = document.querySelector(".lightboxModal__close");
  closeBtn.addEventListener("click", function() {
    const lightboxImg = document.querySelector(".lightboxModal__img");
    if (lightboxImg) {lightboxImg.remove()}
    const lightboxVideo = document.querySelector(".lightboxModal__video");
    if (lightboxVideo) {lightboxVideo.remove()}
    closeLightboxModal();
  })
}

export function openLightbox(){
    displayLightboxModal();
    closeLightbox();
}
