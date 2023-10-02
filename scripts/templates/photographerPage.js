import { displayModal, closeModal } from "../utils/contactForm.js";
import { onOpenModal } from "../utils/photoModal.js"; // Import openModalBtn here

//template for photographer section for photographer page
export function photographerPageTemplate(photographer) {
  // console.log("photographer", photographer);
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
  const mediaPath = `assets/images/Photographers ID Photos/${photographer.portrait}`;

  //   append to link
  const portraitElement = document.createElement("img");
  portraitElement.src = mediaPath; // Use the mediaPath instead of just photographer.portrait
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
// photographerPage.js
export function photographerMediaTemplate(filteredMedias, photographer) {
  filteredMedias.forEach((media) => {
    // console.log("photographer.name", media._image);
    const mediasWrapper = document.querySelector(".medias-wrapper");
    // Create a container for each media item
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-info");

    // Create a container for media details
    const mediaImg = document.createElement("div");
    mediaImg.classList.add("media-img");

    const mediaDetails = document.createElement("div");
    mediaDetails.classList.add("media-details");

    // Create a <p> element for the media ID
    const mediaIdElement = document.createElement("p");
    mediaIdElement.innerHTML = `ID: ${media.id}`;

    // Create a <p> element for the media title
    const mediaTitleElement = document.createElement("p");
    mediaTitleElement.innerHTML = media.title;

    // Create a <p> element for the media title
    const mediaLikeContainer = document.createElement("div");
    mediaLikeContainer.classList.add("media-like");
    // Create a <button> element for the modal open
    const modalBtn = document.createElement("button");
    modalBtn.classList.add("open-modal-btn");
    modalBtn.innerHTML = media.title;
    modalBtn.onclick = onOpenModal;

    // Create a <p> element for the media title
    const mediaLikeElement = document.createElement("p");
    mediaLikeElement.innerHTML = media.likes;

    // Create a <p> element for the media title
    const mediaLikeHeartElement = document.createElement("i");
    mediaLikeHeartElement.classList.add("fa-solid", "fa-heart");

    //   Construct the path to the image using the correct folder structure
    // console.log(photographer);

    const mediaTypeElement = document.createElement("p");

    if (media.image) {
      mediaTypeElement.innerHTML = "Type: Image";

      // Construct the path to the image using the correct folder structure
      const imagePath = `assets/images/${photographer.name}/${media.image}`;

      // Create an <img> element for displaying the image
      const imageElement = document.createElement("img");
      imageElement.src = imagePath;
      imageElement.alt = media.image;

      // Append the image element to the mediaImg container
      mediaImg.appendChild(imageElement);
    } else if (media.video) {
      mediaTypeElement.innerHTML = "Type: Video";
      // Construct the path to the video using the correct folder structure
      const videoPath = `assets/images/${photographer.name}/${media.video}`;

      // Create a <video> element for displaying the video
      const videoElement = document.createElement("video");
      videoElement.src = videoPath;
      videoElement.controls = true;

      // Append the video element to the mediaImg container
      mediaImg.appendChild(videoElement);
    }
    // mediaDetails.appendChild(mediaIdElement);
    mediaDetails.appendChild(mediaTitleElement);
    mediaLikeContainer.appendChild(mediaLikeElement);
    mediaLikeContainer.appendChild(mediaLikeHeartElement);

    // Add the media details container to the media container
    mediaContainer.appendChild(mediaImg);
    mediaContainer.appendChild(mediaDetails);
    mediaContainer.appendChild(mediaDetails);
    mediaDetails.appendChild(mediaLikeContainer);
    mediaDetails.appendChild(modalBtn);

    // Add the media container to the medias wrapper
    mediasWrapper.appendChild(mediaContainer);
  });
}
