//template for index page
export function photographerTemplate(photographer) {
  //créationdu template "photographer_section"

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("photographer-card");

  // Construct the path to the image using the correct folder structure
  const imagePath = `assets/images/Photographers ID Photos/${photographer.portrait}`;

  //link
  const photographerLink = document.createElement("a");
  photographerLink.setAttribute(
    "href",
    `/photographer.html?id=${photographer.id}`
  );

  //append to link
  const portraitElement = document.createElement("img");
  portraitElement.src = imagePath; // Use the imagePath instead of just photographer.portrait
  portraitElement.alt = photographer.name;

  const titleElement = document.createElement("h2");
  titleElement.innerHTML = photographer.name;

  //-------------------------------------------------------------------

  //container parent
  const cityContainer = document.createElement("div");
  cityContainer.classList.add("city-container");

  //container child
  const cityElement = document.createElement("p");
  cityElement.innerHTML = `${photographer.city}`;

  //container child
  const countryElement = document.createElement("p");
  countryElement.innerHTML = photographer.country;

  cityContainer.appendChild(cityElement);
  cityContainer.appendChild(countryElement);

  //-------------------------------------------------------------------

  const taglineElement = document.createElement("p");
  taglineElement.innerHTML = photographer.tagline;

  const priceElement = document.createElement("p");
  priceElement.innerHTML = `${photographer.price} €/jour`;

  cardContainer.appendChild(photographerLink);
  cardContainer.appendChild(photographerLink);
  photographerLink.appendChild(portraitElement);
  photographerLink.appendChild(titleElement);
  photographerLink.appendChild(cityContainer);
  photographerLink.appendChild(taglineElement);
  photographerLink.appendChild(priceElement);

  return {
    getUserCardDOM: () => cardContainer,
  };
}
