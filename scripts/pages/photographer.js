//Mettre le code JavaScript lié à la page photographer.html

// import { fetchJsonData } from "./fetchJsonData.js";

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

const photographerInfo = getPhotographerInfo();

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo() {
  // Fetch the photographer object from the JSON data
  const { photographers } = await getPhotographers();
  // Retrieve the photographer's id from the URL parameters
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  // Find the photographer object in the photographers array with the matching id
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}

function renderPhotographHeader(object) {
  // Destructuring the photographer info object to extract to extract its properties
  const { name, city, country, tagline, portrait } = object;

  // Create the HTML for the header section
  const photographHeader = `
      <section class="photograph-header">
        <div class="photograph-info">
          <h1 class="photograph-name">${name}</h1>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
        </div>
        <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
      </section>
    `;
  // Add the footer HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

async function renderPhotographerPage() {
  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  await renderPhotographHeader(photographerInfo);
}

renderPhotographerPage();
