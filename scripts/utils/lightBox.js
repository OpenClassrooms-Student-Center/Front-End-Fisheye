const $lightbox_modal = document.getElementById("lightbox_modal");
const $mediaCarousel = document.getElementById("mediaCarousel");
const $lightboxFigure = document.querySelector("#lightbox_modal figure");
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

  // Créer une nouvelle image ou vidéo
  const media = photographerMedia[indexMedia];
  const $lightboxMedia = media.video
    ? createVideo(`assets/galleries/${media.video}`)
    : createImage(`assets/galleries/${media.image}`, media.title);

  $lightboxFigure.appendChild($lightboxMedia);
  $lightboxFigure.appendChild(createCaption(media.title));

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

  // Mettre à jour le texte explicatif
  const prevMediaText = document.getElementById("prevMediaText");
  const nextMediaText = document.getElementById("nextMediaText");

  prevMediaText.textContent = index === 0 ? "(Média précédent non disponible)" : "";
  nextMediaText.textContent = index === photographerMedia.length - 1 ? "(Média suivant non disponible)" : "";
}

