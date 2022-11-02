import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createHeader } from "../components/WebsiteHeader.js"
//import { ContactModal } from "../components/contactModal.js"
// 1- Variables

// Global variable tracking the medias liked by user

// 2- Code moteur

// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it, and adds event listeners to the modal buttons
async function init() {
  createHeader("profilePage")
  displayData(await API.getPhotographersByID())
  //addModalEventListeners()
}

function displayData(photographer) {
  new Photographer(photographer).displayProfile()
}

init()
