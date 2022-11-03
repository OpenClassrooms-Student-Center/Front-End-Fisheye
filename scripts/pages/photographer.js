import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createHeader } from "../components/WebsiteHeader.js"

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it
async function init() {
  createHeader("profilePage")
  displayData(await API.getPhotographersByID())
}

function displayData(photographer) {
  new Photographer(photographer).displayProfile()
}

init()
