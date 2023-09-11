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
    this.mediasApi = new MediasApi("assets/images");

    this.media = async () => {
      const mediasData = await this.mediasApi.getMedias();
      mediasData.map((media) => new MediasFactory(media));
      const mediasDataFiltered = mediasData.filter(
        (photographer) => photographer.photographerId == id
      );

      console.log("mediasDataFiltered", mediasDataFiltered);
      return mediasDataFiltered;
    };
  }
  async medias() {
    const photographer = await this.photographer();
    const mediasData = await this.media();

    mediasData.forEach((media) => {
      const template = new MediaCard(media, photographer);
      this.$mediasWrapper.appendChild(template.createMediaCard());
    });
    newValue("about-photographer-likes-count", allLikes);
  }
}

//------------------------------------------------------------------------

async function init() {
  const photographerPages = new PhotographerPages();

  // Get photographer data
  try {
    const photographers = await getPhotographerById();
    displayData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
