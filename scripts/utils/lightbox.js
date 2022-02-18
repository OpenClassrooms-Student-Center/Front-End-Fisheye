// DOM elements
const closeBtn = document.querySelector(".lightbox__close");
const lightbox = document.querySelector(".lightbox");
const photos = document.querySelector(".gallerie");

//fermer la ligthbox
closeBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.style.display = "none";
}

//ouvrir la lightbox
photos.addEventListener("click", openLightbox);

function openLightbox() {
  lightbox.style.display = "flex";
}

//les export
export { closeLightbox };
