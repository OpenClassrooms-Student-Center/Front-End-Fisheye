//Mettre le code JavaScript lié à la page photographer.html
// import { getPhotographerInfo } from "../utils/getPhotographersInfo.js"

// import { fetchJsonData } from "./fetchJsonData.js";

async function fetchJsonData() {
  try {
    const jsonPath = "./data.photographers.json";
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const photographerInfo = getPhotographerInfo();

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo() {
  // Fetch the photographer object from the JSON data
  const { photographers } = await fetchJsonData();
  // Retrieve the photographer's id from the URL parameters
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  // Find the photographer object in the photographers array with the matching id
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}



//GetPhotoCardDOM

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
        <button class="button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
        <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
      </section>
    `;
   // Add the footer HTML to the main element
   const mainEl = document.querySelector("main");
   mainEl.innerHTML += photographHeader;
   mainEl.append("photograph-header");
  }

  async function renderPhotographMediaPage() {
    // Render the header section of the page with the photographer's name, location, tagline, and portrait
    await renderPhotographHeader(photographerInfo);
  }  

  renderPhotographMediaPage();

