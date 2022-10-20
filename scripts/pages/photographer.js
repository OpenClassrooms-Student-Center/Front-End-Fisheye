import { createHeader } from "../templates/components/PhotographerHeader.js"
import { closeModal } from "../utils/contactForm.js"
import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createMediaList } from "../templates/components/SortingDropdown.js"

// 1- Variables
// DOM
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
closeModalButton.addEventListener("click", closeModal)

// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it
async function init() {
  createHeader("profilePage")
  API.getAllData()
    .then((photographerList) => {
      return photographerList.find(
        (photographer) =>
          photographer.id ==
          new URL(document.location).searchParams.get("id")
      )
    })
    .then((matchingPhotographer) => {
      new Photographer(matchingPhotographer).displayProfile(
        matchingPhotographer
      )
      createMediaList()
    })
}

init()
