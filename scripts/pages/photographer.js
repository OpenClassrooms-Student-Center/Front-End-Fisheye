import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal } from "../utils/contactForm.js";


const photographer = await getPhotographersById();

function renderPhotographerHeader() {
  const {name, city, country, tagline, portrait } = photographer

  const photographerHeader = `
  <section class="photographer__header">
    <div class="photographer__info">
      <h2 class="photographer__name photographer__name--doubled">${name}</h2>
      <p class="photographer__location photographer__location--doubled">${city}, ${country}</p>
      <p class="photographer__tagline photographer__tagline--doubled">${tagline}</p>
    </div>
    <button class="contact__button button" aria-label="contact me">Contactez-moi</button>
    <img src="./assets/photographers/${portrait}" alt="${name}" class="photographer__img">
  </section>
  `

  const main = document.querySelector("main");

  main.innerHTML += photographerHeader;
}

function displayNameInModal() {
  const { name } = photographer
  const title = document.querySelector(".form__title")
  title.innerHTML += `<br>${name}`
}

function openContactModal() {
  const contactBtn = document.querySelector(".contact__button");
  contactBtn.addEventListener("click", displayModal)
  displayNameInModal();
}

function closeContactModal() {
  const contactBtn = document.querySelector(".form__close");
  console.log(contactBtn)
  contactBtn.addEventListener("click", closeModal)
  contactBtn.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
      closeModal();
    }
  })
}





renderPhotographerHeader();
openContactModal();
closeContactModal();
