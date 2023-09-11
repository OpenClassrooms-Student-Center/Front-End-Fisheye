import { displayModal, closeModal } from "../utils/contactForm.js";

//template for photographer section for photographer page
export function photographerPageTemplate(photographer) {
  //création du template "photographer_section"
  const photographHeader = document.querySelector(".photograph-header");

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
  const closingModal = document.getElementById("modalClose");
  closingModal.onclick = closeModal;

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

//template for media section for photographer page
export function photographerMediaTemplate(filteredMedias) {
  console.log("filteredMedias1", filteredMedias);
  const mediasWrapper = document.querySelector(".medias-wrapper");

  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-info");

  // //-------------------------------------------------------------------

  //container parent
  const mediaDetails = document.createElement("div");
  mediaDetails.classList.add("media-details");

  //container child
  const filteredMedia = document.createElement("p");
  filteredMedia.innerHTML = filteredMedias.id;

  //-------------------------------------------------------------------

  mediasWrapper.appendChild(mediaContainer);
  mediaContainer.appendChild(mediaDetails);
  mediaDetails.appendChild(filteredMedia);

  return {
    getUserCardDOM: () => mediaContainer,
  };
}
