import { createHeader } from "../templates/header.js"
import { getAllData } from "../api/Api.js"
import { closeModal } from "../utils/contactForm.js"
import { PhotographerHeader } from "../templates/photographerPage/photographerHeader.js"
import { Photographer } from "../models/Photographer.js"

// 1- Variables
// DOM
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
closeModalButton.addEventListener("click", closeModal)

createHeader()

// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it
async function init() {
  getAllData()
    .then((photographerList) => {
      return photographerList.photographers.find(
        (photographer) =>
          photographer.id ==
          new URL(document.location).searchParams.get("id")
      )
    })
    .then((matchingPhotographer) => {
      return new Photographer(matchingPhotographer)
    })
    .then((photographer) => {
      const Template = new PhotographerHeader(photographer)
      document.querySelector("#main").appendChild(Template.createPhotographerHeader())
    })
}

init()
