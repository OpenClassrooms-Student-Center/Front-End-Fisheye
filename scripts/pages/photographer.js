import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createHeader } from "../components/WebsiteHeader.js"
import { ModalDisplayButtons } from "../components/ModalDisplayButtons.js"
import { MediaFactory } from "../factories/mediaFactory.js"
import { PhotographerMedia } from "../components/PhotographerMedia.js"

// 1- Variables
// DOM
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
// Adds event listener on corresponding buttons after they have been added to the DOM
function addModalEventListeners() {
  const openModalButton = document.querySelector(".open_modal_button")
  openModalButton.addEventListener("click", ModalDisplayButtons.displayModal)
  closeModalButton.addEventListener("click", ModalDisplayButtons.closeModal)
}

// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it, and adds event listeners to the modal buttons
async function init() {
  createHeader("profilePage")
  displayData(await API.getPhotographersByID())
  addModalEventListeners()
}

function displayData(data) {
  new Photographer(
    data.photographer.find((photographer) => photographer)
  ).displayProfile()
  const photographerMedias = data.media.map(
    (element) => new MediaFactory(element)
  )
  photographerMedias.forEach((element) => {
    const Template = new PhotographerMedia(element)
    Template.createMediaSection()
    document
      .querySelector(".photographer-media")
      .appendChild(Template.createMediaList())
  })
}

init()
