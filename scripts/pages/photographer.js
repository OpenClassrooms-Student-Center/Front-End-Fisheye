//Mettre le code JavaScript lié à la page photographer.html

import { createHeader } from "../templates/header.js"
import { displayModal, closeModal } from "../utils/contactForm.js"

// 1- Variables
// DOM

const contactButton = document.querySelector(".contact_button")
const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
contactButton.addEventListener("click", displayModal)
closeModalButton.addEventListener("click", closeModal)

createHeader()

// Get param from URL to display the selected photographer
const params = new URL(document.location).searchParams
const photographerId = params.get("id")

// 3- Fonctions
