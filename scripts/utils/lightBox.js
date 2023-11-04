const $lightbox_modal = document.getElementById("lightbox_modal");
const $mediaCarousel = document.getElementById("mediaCarousel");
const $lightboxFigure = document.querySelector("#lightbox_modal figure");
const $ligthboxImage = document.createElement("img");
const $closeLightbox = document.getElementById("closeLightbox");
const $prevMedia = document.getElementById("prevMedia");
const $nextMedia = document.getElementById("nextMedia");

$closeLightbox.addEventListener("click", () => {
  closeModal("lightbox_modal");
});
$prevMedia.addEventListener("click", () => {
  navigateMedia("prev");
});
$nextMedia.addEventListener("click", () => {
  navigateMedia("next");
});

let indexMedia;

// Affichage de la lightbox
function displayLightBoxContent(mediaId) {
  indexMedia = photographerMedia.findIndex((media) => media.id === mediaId);

  // Effacer le contenu précédent de la lightbox
  $lightboxFigure.innerHTML = "";

  // Créer une nouvelle image
  const $lightboxImage = document.createElement("img");
  $lightboxImage.setAttribute(
    "src",
    `assets/galleries/${photographerMedia[indexMedia].image}`
  );
  $lightboxImage.setAttribute("alt", `${photographerMedia[indexMedia].title}`);
  // Créer une nouvelle vidéo
  const $lightboxVideo = document.createElement("video");
  const $lightboxVideoSource = document.createElement("source");
  $lightboxVideoSource.setAttribute(
    "src",
    `assets/galleries/${photographerMedia[indexMedia].video}`
  );
  $lightboxVideoSource.setAttribute("type", "video/mp4");
  $lightboxVideo.appendChild($lightboxVideoSource)

  // Ajouter l'image et son titre à la lightbox
  const isVideo = photographerMedia[indexMedia].video;
  isVideo
    ? $lightboxFigure.appendChild($lightboxVideo)
    : $lightboxFigure.appendChild($lightboxImage);
  const $figcaption = document.createElement("figcaption");
  $figcaption.textContent = photographerMedia[indexMedia].title;
  $lightboxFigure.appendChild($figcaption);

  // Activer ou désactiver les boutons de navigation
  toggleNavigationButtons(indexMedia);

  // Passer le sens à la fonction navigateMedia
  navigateMedia("sense");
}

// Navigation du carrousel
function navigateMedia(sense) {
  if (indexMedia !== undefined) {
    let newIndex;

    if (sense === "prev") {
      newIndex = indexMedia - 1;
    } else if (sense === "next") {
      newIndex = indexMedia + 1;
    }

    if (newIndex >= 0 && newIndex < photographerMedia.length) {
      const newMedia = photographerMedia[newIndex].id;
      displayLightBoxContent(newMedia);
    }
  }
}

// Activer ou désactiver les boutons de navigation
function toggleNavigationButtons(index) {
  $prevMedia.disabled = index === 0;
  $nextMedia.disabled = index === photographerMedia.length - 1;
}
