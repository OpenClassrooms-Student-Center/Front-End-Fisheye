// import { displayModal } from "../utils/contactForm.js";
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";

const photographer = await getPhotographersById();

async function displayData() {
  const datas = photographerFactory(photographer);
  const photographerHeader = datas.getUserHeader()
  const main = document.querySelector("main");
  main.innerHTML += photographerHeader;
}

async function init() {
  displayData(photographer);
}

function displayNameInModal() {
  const { name } = photographer
  const title = document.querySelector(".form__title")
  title.innerHTML += `<br>${name}`
}

function openContactModal() {
  const contactBtn = document.querySelector(".contact__button");
  contactBtn.addEventListener("click", displayModal);
  contactBtn.focus();
  displayNameInModal();
}

function closeContactModal() {
  const closeBtn = document.querySelector(".form__close");
  closeBtn.addEventListener("click", closeModal);
  const contactBtn = document.querySelector(".contact__button");
  console.log(contactBtn);
  contactBtn.focus();

}

init();
openContactModal();
closeContactModal();
