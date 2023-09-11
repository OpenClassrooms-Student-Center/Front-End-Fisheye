import { displayModal, closeModal } from "../utils/contactForm.js";

//template for index page
export function photographerPageTemplate(photographer) {
  //créationdu template "photographer_section"

  const photographHeader = document.querySelector(".photograph-header");
  //   const contactButton = document.querySelector(".contact_button");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("photographer-info");

  const contactDiv = document.createElement("div");
  contactDiv.classList.add("photographer-contact");

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("photographer-image-div");

  // Create the contact button element
  const contactButton = document.createElement("button");
  contactButton.classList.add("contact_button"); // Add the class "contact_button"
  contactButton.textContent = "Contactez-moi";
  contactButton.onclick = displayModal;

  // Create the close contact button element

  //   Construct the path to the image using the correct folder structure
  const imagePath = `assets/images/Photographers ID Photos/${photographer.portrait}`;

  //   append to link
  const portraitElement = document.createElement("img");
  portraitElement.src = imagePath; // Use the imagePath instead of just photographer.portrait
  portraitElement.alt = photographer.name;

  const titleElement = document.createElement("h2");
  titleElement.innerHTML = photographer.name;

  //-------------------------------------------------------------------

  //container parent
  const cardDetails = document.createElement("div");
  cardDetails.classList.add("photographer-details");

  //   //-------------------------------------------------------------------

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

  photographHeader.appendChild(cardContainer);
  cardContainer.appendChild(cardDetails);
  cardDetails.appendChild(titleElement);
  cardDetails.appendChild(cityContainer);
  cardDetails.appendChild(taglineElement);
  cardContainer.appendChild(contactDiv);
  cardContainer.appendChild(imageDiv);
  imageDiv.appendChild(portraitElement);
  contactDiv.appendChild(contactButton);

  return {
    getUserCardDOM: () => cardContainer,
  };
}
