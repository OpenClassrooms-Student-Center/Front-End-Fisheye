async function getPhotographers() {
  //récupération des photographes
  const photographersResponse = await fetch("photographers.json");
  const photographersData = await photographersResponse.json();

  return photographersData;
}

async function displayData(photographers) {
  //création de la section photographes
  const photographersSection = document.querySelector(".photographer_section");

  //boucle sur le json
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    //ajout des éléments à la classe "photographer_section"
    photographersSection.appendChild(userCardDOM);
  });
}

function photographerTemplate(photographer) {
  //créationdu template "photographer_section"

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("photographer-card");

  // Construct the path to the image using the correct folder structure
  const imagePath = `assets/images/Photographers ID Photos/${photographer.portrait}`;

  const portraitElement = document.createElement("img");
  portraitElement.src = imagePath; // Use the imagePath instead of just photographer.portrait
  portraitElement.alt = photographer.name;

  const titleElement = document.createElement("h2");
  titleElement.innerHTML = photographer.name;

  const cityElement = document.createElement("p");
  cityElement.innerHTML = photographer.city;

  const countryElement = document.createElement("p");
  countryElement.innerHTML = photographer.country;

  const taglineElement = document.createElement("p");
  taglineElement.innerHTML = photographer.tagline;

  const priceElement = document.createElement("p");
  priceElement.innerHTML = `${photographer.price} €/jour`;

  cardContainer.appendChild(portraitElement);
  cardContainer.appendChild(titleElement);
  cardContainer.appendChild(cityElement);
  cardContainer.appendChild(countryElement);
  cardContainer.appendChild(taglineElement);
  cardContainer.appendChild(priceElement);

  return {
    getUserCardDOM: () => cardContainer,
  };
}

async function init() {
  // Récupère les datas des photographes
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
