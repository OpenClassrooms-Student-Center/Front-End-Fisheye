// fetch photographers from the JSON data

//import { renderBookSection } from "../factories/photographerFactory.js";

async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  if (response.ok) {
    const data = await response.json();
    return {
      photographers: data.photographers,
    };
  } else {
    throw new Error("Données des photographes inaccessibles.");
  }
}

async function getPhotographerMedias(id) {
  const response = await fetch("./data/photographers.json");
  if (response.ok) {
    const data = await response.json();
    return {
      medias: data.media.filter(media => media.photographerId == id)
    };
  } else {
    throw new Error("Données des photographes inaccessibles.");
  }
}

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo(photographerId) {
  const { photographers } = await getPhotographers();
  // Find the photographer object in the photographers array with the matching id
  let ph = photographers.find(
    (photographer) => photographer.id === photographerId
  );
  //ph.medias = getPhotographerMedias();
  return ph;
}

async function renderPhotographerPage() {
  // const params = new URL(document.location).searchParams;
  // const photographerId = parseInt(params.get("id"));
  // Retrieve the photographer's id from the URL parameters

  const url = new URL(window.location.href);
  const photographerId = parseInt(url.searchParams.get("id"));

  const photographerInfo = await getPhotographerInfo(photographerId);
  const photographerMedia = await getPhotographerMedias(photographerId);
  photographerInfo.medias = photographerMedia.medias;

  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  const photographModel = photographerFactory(photographerInfo);

  photographModel.renderBookSection();
  photographModel.renderPhotographHeader();
}

renderPhotographerPage();
