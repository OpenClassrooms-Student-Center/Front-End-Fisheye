import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal } from "../utils/contactForm.js";


const photographer = await getPhotographersById();

function renderPhotographerHeader() {
  const {name, city, country, tagline, portrait } = photographer

  const photographerHeader = `
  <section class="photographer__header">
    <div class="photographer__info">
      <h2 class="photographer__name">${name}</h2>
      <p class="photographer__location">${city}, ${country}</p>
      <p class="photographer__tagline">${tagline}</p>
    </div>
    <button class="contact__button" aria-label="contact me"xz>Contactez-moi</button>
    <img src="./assets/photographers/${portrait}" alt="${name}" class="photographer__img">
  </section>
  `

  const main = document.querySelector("main");

  main.innerHTML += photographerHeader;
}

function openContactModal() {
  const contactBtn = document.querySelector(".contact__button");
  contactBtn.addEventListener("click", displayModal)
}
function closeContactModal() {
  const contactBtn = document.querySelector(".modal__close  ");
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
