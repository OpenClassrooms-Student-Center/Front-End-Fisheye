const $lightbox_modal = document.getElementById("lightbox_modal");
const $lightboxFigure = document.querySelector("#lightbox_modal figure");
const $ligthboxImage = document.createElement("img");
const $closeLightbox = document.getElementById("closeLightbox");
const $prevMedia = document.getElementById("prevMedia");
const $nextMedia = document.getElementById("nextMedia");

$closeLightbox.addEventListener("click", () => {
  closeModal("lightbox_modal");
});
// $prevMedia.addEventListener("clic", navigateMedia("prev"));
// $nextMedia.addEventListener("clic", navigateMedia("next"));

// Fermeture de la lightbox
// function closeLightbox(){
//   $lightbox_modal.classList.remove("visible")
// }

// Affichage de la lightbox
function displayLightBox(mediaSource, mediaTitle) {
  console.log("mediaSource:", mediaSource);

  $ligthboxImage.setAttribute("src", `assets/galleries/${mediaSource}`);
  $ligthboxImage.setAttribute("alt", `${mediaTitle}`);
  $lightboxFigure.appendChild($ligthboxImage);
  return $lightboxFigure;
}
