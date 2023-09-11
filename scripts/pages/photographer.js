import { MediasApi } from "../api/api.js";
import { photographerPageTemplate } from "../templates/photographerPage.js";

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

async function displayData() {
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
class PhotographerPages {
  constructor() {
    this.$mediasWrapper = document.querySelector(".medias-wrapper");
    this.mediasApi = new MediasApi("/data/photographers.json");
  }

  //displays photographer info
  async photographer() {
    try {
      const medias = await this.mediasApi.getMedias();
      console.log("medias", medias);
    } catch (error) {
      console.error("An error occurred while fetching media data:", error);
    }
  }

  //displays media info
  async medias() {
    try {
      console.log("MediasApi URL:", this.mediasApi._url);
      const photographer = await this.photographer();
      const mediasData = await this.media();

      mediasData.forEach((media) => {
        const template = new MediaCard(media, photographer);
        this.$mediasWrapper.appendChild(template.createMediaCard());
      });

      // Log the filtered media data
      console.log("mediasDataFiltered:", mediasData);

      // You can also log other data or variables here
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }
}

//------------------------------------------------------------------------

async function init() {
  const app = new PhotographerPages();
  app.photographer();

  // Get photographer data
  try {
    const photographers = await getPhotographerById();
    displayData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
