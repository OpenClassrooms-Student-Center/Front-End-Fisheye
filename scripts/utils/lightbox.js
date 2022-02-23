// DOM elements
const closeBtn = document.querySelector(".lightbox__close");
const lightbox = document.querySelector(".lightbox");
const nextBtn = document.querySelector(".lightbox__next");
const prevBtn = document.querySelector(".lightbox__prev");

//fermer la ligthbox
closeBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.style.display = "none";
}

//ouvrir la lightbox
function openLightbox() {
  lightbox.style.display = "flex";
}

// aller a la photo suivante
function nextOne() {}
//les export
export { openLightbox };
