//template for index page
class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard(photographer) {
    // créationd u template "photographer_section"
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("photographer-card");
    // Construct the path to the image using the correct folder structure
    const imagePath = `assets/images/Photographers ID Photos/${photographer._portrait}`;

    //append to link
    const portraitElement = document.createElement("img");
    portraitElement.src = imagePath;
    portraitElement.alt = `${photographer._name}`;

    const photographerLink = document.createElement("a");
    photographerLink.setAttribute(
      "href",
      `/photographer.html?id=${photographer._id}`
    );
    //container parent
    const localizationContainer = document.createElement("div");
    localizationContainer.classList.add("city-container");
    //container child
    const cityElement = document.createElement("p");
    cityElement.innerHTML = `${photographer._city}`;
    localizationContainer.appendChild(cityElement);

    const countryElement = document.createElement("p");
    countryElement.innerHTML = `${photographer._country}`;
    localizationContainer.appendChild(countryElement);

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = `${photographer._name}`;

    const taglineElement = document.createElement("p");
    taglineElement.innerHTML = `${photographer._tagline}`;
    taglineElement.classList.add("taglineElement");

    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${photographer._price} €/jour`;
    priceElement.classList.add("priceElement");

    cardContainer.appendChild(photographerLink);
    photographerLink.appendChild(portraitElement);
    photographerLink.appendChild(titleElement);
    photographerLink.appendChild(localizationContainer);
    photographerLink.appendChild(taglineElement);
    photographerLink.appendChild(priceElement);

    return cardContainer;
  }
}
export { PhotographerCard };
