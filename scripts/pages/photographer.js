import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import { photographerHero } from "../templates/photographer.js";
import { getMediaCard } from "../templates/media.js";
import { displayLikesContainer } from "../templates/displayLikesContainer.js";
import { getFirstName, changeFilter } from "../utils/utils.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));

  const { photographers } = await getAllorOnePhotographer(id);
  const photographer = photographers[0];

  const allLikes = photographer.media.reduce(
    (total, media) => total + media.likes,
    0
  );


  const allMedias = {
    allMedias: changeFilter(photographer.media),
    firstName: getFirstName(photographer.name),
    allLikes: allLikes,
    photographerPrice: photographer.price,
  };

  // Reorder medias
  sortMedias(allMedias);

  // Display photographer hero banner
  photographerHero(photographers[0]);

  // Display medias
  displayMedias(allMedias);

  // Display total likes container
  displayLikesContainer(allLikes, photographers[0].price);

  // Handle contact form
  handleContactForm();

  // Validate form
  validateForm();
}

function displayMedias(medias) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";

  medias.allMedias?.forEach((media, index) => {
    const { image, video, title, likes } = media;

    const mediaLink = `assets/photographers/${medias.firstName}/${image ?? video}`;

    const mediaElement = image
      ? `<img src="${mediaLink}" alt="${title}">`
      : `<video src="${mediaLink}" autoplay loop muted></video>`;


    const mediaCardProps = {
      mediaElement,
      title,
      likes,
      allMedias: medias.allMedias,
      firstName: medias.firstName,
      allLikes: medias.allLikes,
      photographerPrice: medias.photographerPrice,
      index: index
    };

    mediaSection.appendChild(
      getMediaCard(
        mediaCardProps
      )
    );
    
  });
}

function sortMedias(allMedias) {
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (event) => {
    const sort = event.target.value;
    displayMedias({
      ...allMedias,
      allMedias: changeFilter(allMedias.allMedias, sort),
    });
  });
}

function handleContactForm() {
  const contactButton = document.querySelector("#contactButton");
  contactButton.addEventListener("click", () => {
    displayModal("contact_modal");
  });

  contactButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      displayModal("contact_modal");
    }
  })

  const closeModalButton = document.querySelector("#closeForm");
  closeModalButton.addEventListener("click", () => {
    closeModal("contact_modal");
  })

  closeModalButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      closeModal("contact_modal");
    }
  })
}

function validateForm(){
  const form = document.querySelector("form");

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (checkInputs(firstName, lastName, email, message)) {
       const dataToSend = {
         firstName,
         lastName,
         email,
         message,
       };
       
       console.log(dataToSend);

       form.reset();
       closeModal("contact_modal");

    }
  })
}

function checkInputs(firstName, lastName, email, message) {
  let isFormValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (firstName.value === "") {

    firstNameError.style.display = "block";
    firstName.style= "border: 2px solid red";
    isFormValid = false;
  } else {
    firstNameError.style.display = "none";
    firstName.style= "border: 2px solid green";
  }

  if (lastName.value === "") {
    lastNameError.style.display = "block";
    lastName.style= "border: 2px solid red";
    isFormValid = false;
  } else {
    lastNameError.style.display = "none";
    lastName.style= "border: 2px solid green";
  }

  if (email.value === "" || !emailRegex.test(email.value)) {
    emailError.style.display = "block";
    email.style= "border: 2px solid red";
    isFormValid = false;
  } else {
    emailError.style.display = "none";
    email.style= "border: 2px solid green";
  }

  if (message.value === "") {
    messageError.style.display = "block";
    message.style= "border: 2px solid red";
    isFormValid = false;
  } else {
    messageError.style.display = "none";
    message.style= "border: 2px solid green";
  }

  return isFormValid;
}

init();
