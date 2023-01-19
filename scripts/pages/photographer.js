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

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo(photographerId) {
  // Fetch the photographer object from the JSON data
  // console.log(photographerId);

  const { photographers } = await getPhotographers();
  // console.log(photographerId)
  // Retrieve the photographer's id from the URL parameters
  // const params = new URL(document.location).searchParams;
  // const photographerId = parseInt(params.get("id"));
  // console.log(photographerId)
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
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div>
        <img class="photograph-img" src="./assets/photos/Photographers ID Photos/${portrait}" alt="Photo de ${name}">
      </section>
    `;
  // Add the footer HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

async function renderPhotographerPage() {

  // const params = new URL(document.location).searchParams;
  // const photographerId = parseInt(params.get("id"));
  const url = new URL(window.location.href)
const photographerId = parseInt(url.searchParams.get('id'))

  const photographerInfo = await getPhotographerInfo(photographerId);
  console.log('Test : objet photographers')
  console.log(photographerId)

  // Render the header section of the page with the photographer's name, location, tagline, and portrait

  renderPhotographHeader(photographerInfo);
}

renderPhotographerPage();
