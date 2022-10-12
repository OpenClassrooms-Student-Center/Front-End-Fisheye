// import { PhotographerFactory } from "../factories/photographerFactory.js"
import { Photographer } from "../models/Photographer.js"
import { createHeader } from "../templates/header.js"
import { PhotographerCard } from "../templates/PhotographerCard.js"
import { getPhotographers } from "../api/Api.js"

// 1- Variables
function displayData(photographers) {
  photographers
  .forEach((photographer) => {
    const Template = new PhotographerCard(photographer)
    document
      .querySelector(".photographer_section")
      .appendChild(Template.createPhotographerCard())
  })
}

async function init() {
  // Create the main page header, then get photographers data and display them
  createHeader("mainPage")
  displayData(await getPhotographers()
  .then((data) => {
    return data.photographers.map(photographer => new Photographer(photographer))
  })
  )
}

init()
