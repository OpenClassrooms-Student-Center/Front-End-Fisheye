//import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { Photographer } from "../models/Photographer.js"
import { createHeader } from "../components/WebsiteHeader.js"

async function init() {
  // Create the main page header, then get photographers data and display them
  createHeader("mainPage")
  displayData(await API.getAllData("homePage"))
}

function displayData(photographers) {
  photographers.forEach((photographer) => {
    new Photographer(photographer).displayHome()
  })
}

init()
