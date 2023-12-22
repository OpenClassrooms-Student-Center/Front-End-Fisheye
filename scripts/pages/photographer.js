//Mettre le code JavaScript lié à la page photographer.html
import { displayModal, closeModal, addModalListeners } from "../utils/contactForm.js";
import { photographerTemplateId, createMediaElement } from "../templates/photographer.js";

async function getPhotographerById(photographerId) {
  try {
    const response = await fetch("http://localhost:5500/data/photographers.json");
    if (!response.ok) {
      throw new Error("datas can not be fetched");
    }
    const dataJson = await response.json();
    const photographers = dataJson.photographers.map((photographer) => ({
      id: photographer.id,
      name: photographer.name,
      firstname: photographer.firstname,
      city: photographer.city,
      country: photographer.country,
      tagline: photographer.tagline,
      portrait: photographer.portrait,
      price: photographer.price,
    }));

    // Trouver le photographe spécifique par son ID
    const photographerFound = photographers.find(
      (photographerToFind) => photographerToFind.id === Number(photographerId)
    );
    return photographerFound;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function getMediaById(photographerId) {
  try {
    const response = await fetch("http://localhost:5500/data/photographers.json");

    if (!response.ok) {
      throw new Error("Media data could not be fetched");
    }

    const mediaJson = await response.json();
    const media = mediaJson.media.filter((mediaToFind) => mediaToFind.photographerId === Number(photographerId));

    return media;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function displayPhotographerInfo() {
  // Récupérer l'ID du photographe à partir de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  // Récupérer les données des photographes
  const photographer = await getPhotographerById(photographerId);

  if (photographer) {
    const photographerInfoContainer = document.getElementById("photograph_header");
    const infoPhoto = photographerTemplateId(photographer);
    photographerInfoContainer.innerHTML = infoPhoto;

    const dailyRate = document.getElementById("tarif_journalier");
    dailyRate.textContent = `${photographer.price}€/jour`;
    addModalListeners();

    //appel des media en fonction id photographe
    const media = await getMediaById(photographerId);
    const mediaContainer = document.getElementById("media-container");
    //appel les media et le prenom du photograph pour chemin media correspondant

    let mediaElements = "";

    media.forEach((mediaItem) => {
      mediaElements += createMediaElement(mediaItem, photographer.firstname);
    });

    mediaContainer.innerHTML = mediaElements;
    //rend cliquable les media
    const allMedia = Array.from(document.getElementsByClassName("media-element"));
    allMedia.forEach((mediaLightbox, index) => {
      mediaLightbox.addEventListener("click", () => {
        openLightbox(index, media);
      });
    });
  } else {
    console.log("Photographer not found");
  }
}
displayPhotographerInfo();

function openLightbox(selectedMediaIndex, media) {
  // Mettez à jour le contenu de la lightbox avec le média sélectionné
  const lightboxMediaContainer = document.getElementById("media_lightbox");

  const selectedMedia = media[selectedMediaIndex];
  const selectedMediaId = selectedMedia.id;

  const selectedMediaElement = document.querySelector(`.media-element[data-mediaId="${selectedMediaId}"]`);

  //récupère HTML de l'élément média sélectionné  et l'injecte dans la div media_lightbox
  const mediaElementHTML = selectedMediaElement.outerHTML;
  lightboxMediaContainer.innerHTML = mediaElementHTML;

  // Affichez la lightbox
  document.getElementById("lightbox").style.display = "block";

  // Ajoutez des écouteurs d'événements pour la navigation dans la lightbox
  document.getElementById("left_arrow").addEventListener("click", () => navigateLightbox(-1));
  document.getElementById("right_arrow").addEventListener("click", () => navigateLightbox(1));

  function navigateLightbox(direction) {
    // Implémentez la logique pour naviguer vers l'image précédente ou suivante
    selectedMediaIndex = (selectedMediaIndex + direction + media.length) % media.length;
    const newMedia = media[selectedMediaIndex];
    const newMediaId = newMedia.id;
    const newMediaElement = document.querySelector(`.media-element[data-mediaId="${newMediaId}"]`);
    const newMediaElementHTML = newMediaElement.outerHTML;

    lightboxMediaContainer.innerHTML = newMediaElementHTML;
  }
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

document.getElementById("close_lightbox").addEventListener("click", () => {
  closeLightbox();
});
