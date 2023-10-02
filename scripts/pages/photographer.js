import { MediasApi } from "../api/api.js";
import {
  photographerPageTemplate,
  photographerMediaTemplate,
} from "../templates/photographerPage.js";
import { MediasFactory } from "../factories/MediasFactory.js";

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
  }

  // // Fetch photographer data (You can implement this method)
  // async photographer() {
  //   // Implement your logic to fetch photographer data here
  // }

  // Fetch media data
  async media() {
    try {
      const mediasApi = new MediasApi("../../data/photographers.json");
      const mediasData = await mediasApi.getMedias();
      return mediasData;
    } catch (error) {
      console.error("Error fetching media data:", error);
      return [];
    }
  }

  // Render medias
  async medias(id) {
    try {
      const photographer = await getPhotographerById(id);
      const mediasData = await this.media();
      const filteredMedias = mediasData.filter(
        (media) => media.photographerId === Number(id)
      );
      return photographerMediaTemplate(filteredMedias, photographer);
    } catch (error) {
      console.error("Error rendering media:", error);
    }
  }
}

// Create an instance of the class and call the medias method
const photographerPagesMedia = new PhotographerPagesMedia();
photographerPagesMedia.medias();

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
