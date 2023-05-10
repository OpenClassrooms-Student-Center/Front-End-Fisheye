import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { render } from "sass";

const photographer = await getPhotographersById();

function renderPhotographerHeader() {
  const {name, city, country, tagline } = photographer

  const photographerHeader = `
  <section>
    <div class="photographer__info>
      <h2 class="photographer__name>${name}</h2>
      <p class="photographer__location>${city}, ${country}</p>
      <p class="photographer__tagline>${tagline}</p>
  </section>
  `

  const main = document.querySelector("#main");
  main.innerHtml += photographerHeader;
}

renderPhotographerHeader();
