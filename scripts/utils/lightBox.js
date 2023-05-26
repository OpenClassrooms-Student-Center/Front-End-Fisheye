const body = document.querySelector("body");
const main = document.querySelector("#main");
const lightboxModal = document.querySelector(".lightboxModal");

// modifie les attributs pour que la modale soit visible
function displayLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  lightboxModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  lightboxModal.style.display = "flex";
}
// modifie les attributs pour que la modale ne soit pas visible
function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}

// au click sur le bouton close, on vide la modale de son media et on appelle la fonction qui ferme la modale
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

// si le media visionné dans la modale est le premier ou le dernier de l'array, on n'affiche pas le bouton previous ou next
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

export function openLightbox(){
  disableLightboxButtons()
  displayLightboxModal();
  closeLightbox();
}
