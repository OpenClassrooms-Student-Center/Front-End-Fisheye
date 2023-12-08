//Mettre le code JavaScript lié à la page photographer.html
import { displayModal, closeModal } from "../utils/contactForm.js";
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
    const photographerModel = photographerTemplateId(photographer);
    const headerCardDOM = photographerModel.getHeaderInfo();
    const dailyRate = document.getElementById("tarif_journalier");
    dailyRate.textContent = `${photographer.price}€/jour`;
    photographerInfoContainer.appendChild(headerCardDOM);

    //appel des media en fonction id photographe
    const media = await getMediaById(photographerId);
    const mediaContainer = document.getElementById("media-container");
    //appel les media et le prenom du photograph pour chemin media correspondant

    let mediaElements = "";

    media.forEach((mediaItem) => {
      mediaElements += createMediaElement(mediaItem, photographer.firstname);
    });

    mediaContainer.innerHTML = mediaElements;
  } else {
    console.log("Photographer not found");
  }
}
displayPhotographerInfo();
