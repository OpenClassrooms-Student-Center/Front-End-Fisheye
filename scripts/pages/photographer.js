import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createDropdownOrder } from "../templates/components/sortingDropdown.js"
import { createHeader } from "../templates/components/WebsiteHeader.js"
import { ModalDisplayButtons } from "../templates/components/ModalDisplayButtons.js"

// 1- Variables
// DOM
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
// Adds event listener on corresponding buttons after they have been added to the DOM
function addModalEventListeners() {
  const openModalButton = document.querySelector(".open_modal_button")
  openModalButton.addEventListener(
    "click",
    ModalDisplayButtons.displayModal
  )
}

closeModalButton.addEventListener(
  "click",
  ModalDisplayButtons.closeModal
)
// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it
async function init() {
  createHeader("profilePage")
  API.getPhotographersByID().then((matchingPhotographer) => {
    new Photographer(matchingPhotographer).displayProfile(
      matchingPhotographer
    )
    createDropdownOrder()
    addModalEventListeners()
  })
}

init()
