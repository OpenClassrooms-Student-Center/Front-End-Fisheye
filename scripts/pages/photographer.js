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
// Find the photographer with the matching id
const id = new URLSearchParams(window.location.search).get("id");
//------------------------------------------------------------------------

async function displayPhotographerData(id) {
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

    // Pass photographer to photographerMediaTemplate
    photographerMediaTemplate(id);
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
  async medias(id) {
    try {
      const medias = await this.mediasApi.getMedias();
      const filteredMedias = medias.filter(
        (media) => media.photographerId === Number(id)
      );

      return photographerMediaTemplate(filteredMedias);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }
}

//------------------------------------------------------------------------

async function init() {
  const id = new URLSearchParams(window.location.search).get("id");
  const app = new PhotographerPagesMedia();
  const mediaData = await app.medias(id);
  // app.medias();

  // Get photographer data
  try {
    await displayPhotographerData(id);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
