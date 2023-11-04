const $lightbox_modal = document.getElementById("lightbox_modal");
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

// Affichage de la lightbox
// ...

// Affichage de la lightbox
function displayLightBoxContent(mediaSource, mediaTitle, mediaId) {
  const indexMedia = photographerMedia.findIndex(
    (media) => media.id === mediaId
  );

  // Effacer le contenu précédent de la lightbox
  $lightboxFigure.innerHTML = "";

  // Créer une nouvelle image
  const $lightboxImage = document.createElement("img");
  $lightboxImage.setAttribute("src", `assets/galleries/${mediaSource}`);
  $lightboxImage.setAttribute("alt", `${mediaTitle}`);

  // Ajouter l'image et son titre à la lightbox
  $lightboxFigure.appendChild($lightboxImage);
  const $figcaption = document.createElement("figcaption");
  $figcaption.textContent = mediaTitle;
  $lightboxFigure.appendChild($figcaption);

  // Activer ou désactiver les boutons de navigation
  toggleNavigationButtons(indexMedia);

  // Afficher la lightbox
  displayModal("lightbox_modal");
}

// ...

// Navigation du carrousel
function navigateMedia(sense) {
  const currentIndex = Array.from($mediaCarousel.children).indexOf(
    $lightboxFigure.parentElement
  );

  let newIndex;

  if (sense === "prev") {
    newIndex = currentIndex - 1;
  } else if (sense === "next") {
    newIndex = currentIndex + 1;
  }

  if (newIndex >= 0 && newIndex < photographerMedia.length) {
    const newMedia = photographerMedia[newIndex];
    displayLightBoxContent(newMedia.image, newMedia.title, newMedia.id);
  }
}

// Activer ou désactiver les boutons de navigation
function toggleNavigationButtons(index) {
  $prevMedia.disabled = index === 0;
  $nextMedia.disabled = index === photographerMedia.length - 1;
}

// ...

