// fetch photographers from the JSON data

// import { renderPhotographHeader } from "../factories/photographerFactory.js";

async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  if (response.ok) {
    const data = await response.json();
    console.log(data.photographers);
    return {
      photographers: data.photographers,
    };
  } else {
    throw new Error("Données des photographes inaccessibles.");
  }
}

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo(photographerId) {
  const { photographers } = await getPhotographers();
  // Find the photographer object in the photographers array with the matching id
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}

async function renderPhotographerPage() {
  // const params = new URL(document.location).searchParams;
  // const photographerId = parseInt(params.get("id"));
  // Retrieve the photographer's id from the URL parameters

  const url = new URL(window.location.href);
  const photographerId = parseInt(url.searchParams.get("id"));

  const photographerInfo = await getPhotographerInfo(photographerId);
  console.log("Test : objet photographers");
  console.log(photographerId);

  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  const photographModel = photographerFactory(photographerInfo);
  photographModel.renderPhotographHeader();
  photographModel.renderBookSection();
}

renderPhotographerPage();
