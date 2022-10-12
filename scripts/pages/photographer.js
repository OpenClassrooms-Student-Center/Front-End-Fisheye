import { createHeader } from "../templates/header.js"
import { PhotographerCard } from "../templates/PhotographerCard.js"
import { displayModal, closeModal } from "../utils/contactForm.js"
// import { getPhotographers } from "./index.js"

// 1- Variables
// DOM

const contactButton = document.querySelector(".contact_button")
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
contactButton.addEventListener("click", displayModal)
closeModalButton.addEventListener("click", closeModal)

createHeader()

// 3- Fonctions
// Get param from URL to display the selected photographer
// function getPhotographerId() {
//   let photographerId
//   const params = new URL(document.location).searchParams
//   photographerId = params.get("id")
//   return photographerId
// }

async function init() {
  let photographerId
  const params = new URL(document.location).searchParams
  photographerId = params.get("id")
  lookupPhotographer(photographerId)
  const Template = new PhotographerCard
  document.querySelector(".photograph-header").appendChild(Template.createPhotographerCard())
}

async function lookupPhotographer(photographerId) {
  await getPhotographers()
  .then((photographers) => {
   const result = photographers.find(id => id = photographerId)
  })
  return result
}

init()
