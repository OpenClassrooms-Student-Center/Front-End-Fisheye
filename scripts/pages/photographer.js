import { MediasApi } from "../api/api.js";
import {
  photographerPageTemplate,
  photographerMediaTemplate,
} from "../templates/photographerPage.js";

async function getPhotographerById(id) {
  // Retrieve photographers
  const photographersResponse = await fetch("data/photographers.json");
  const photographersData = await photographersResponse.json();

  const fetchedPhotographer = photographersData.photographers.find(
    (photographer) => photographer.id === Number(id)
  );

  return fetchedPhotographer;
}

//------------------------------------------------------------------------

async function displayPhotographerData() {
  // Find the photographer with the matching id
  let id = new URLSearchParams(window.location.search).get("id");

  try {
    const photographer = await getPhotographerById(id);
    if (!photographer) {
      console.log("Photographer not found");
      return;
    }

    // Create the photographer's template
    const photographerModel = photographerPageTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    // Add the elements to the "photograph-header" class
    const photographerInfo = document.querySelector(".photograph-header");
    photographerInfo.appendChild(userCardDOM);

    // Update the page title
    document.title = `Fisheye - ${photographer.name}`;
  } catch (error) {
    console.error("Error fetching photographer data:", error);
  }
}

//------------------------------------------------------------------------
class PhotographerPagesMedia {
  constructor() {
    this.$mediasWrapper = document.querySelector(".medias-wrapper");
    this.mediasApi = new MediasApi("/data/photographers.json");
  }

  // displays media info with similar id
  async medias() {
    try {
      const medias = await this.mediasApi.getMedias();
      // console.log("medias", medias);
      const id = new URLSearchParams(window.location.search).get("id");
      const filteredMedias = medias.filter(
        (media) => media.photographerId === Number(id)
      );

      // Loop through filteredMedias and create templates for each media
      filteredMedias.forEach((media) => {
        const mediaModel = photographerMediaTemplate(media);
      });
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }
}

//------------------------------------------------------------------------

async function init() {
  const app = new PhotographerPagesMedia();
  app.medias();

  // Get photographer data
  try {
    const photographers = await getPhotographerById();
    displayPhotographerData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
