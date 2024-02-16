import MediasFactory from "../factories/MediasFactory.js";
import Photographer from "../models/Photographer.js";
import PhotographerAllMedias from "../templates/PhotographerAllMedias.js";

// Récupérer les données des photographes
fetch("./data/photographers.json")
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((data) => {
    const photographers = data.photographers;
    const medias = data.media;

    // Récupérer l'ID du photographe depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    // Trouver le photographe correspondant
    const photographer = photographers.find((element) => element.id === photographerId);
   
    // Afficher le portrait du photographe
    const photographerHeader = new Photographer(photographer);
    photographerHeader.render();

    // Récupérer les médias correspondant au photographe
    /*const mediaWrapper = document.querySelector(".photograph-medias");*/
    const photographerMedias = medias.filter((media) => media.photographerId === photographerId);
    const mediaObjects = photographerMedias.map((media) => new MediasFactory(media));

    // Afficher les medias du photographe
    const photographerAllmedias = new PhotographerAllMedias(mediaObjects);
    photographerAllmedias.render();


  })

