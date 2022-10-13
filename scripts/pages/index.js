// import { PhotographerFactory } from "../factories/photographerFactory.js"
import { Photographer } from "../models/Photographer.js"
import { createHeader } from "../templates/header.js"
import { PhotographerCard } from "../templates/homePage/PhotographerCard.js"
import { getAllData } from "../api/Api.js"

async function init() {
  // Create the main page header, then get photographers data and display them
  createHeader("mainPage")
  displayData(
    await getAllData().then((data) => {
      return data.photographers.map(
        (photographer) => new Photographer(photographer)
      )
    })
  )
}

function displayData(photographers) {
  photographers.forEach((photographer) => {
    const Template = new PhotographerCard(photographer)
    document
      .querySelector(".photographer_section")
      .appendChild(Template.createPhotographerCard())
  })
}

init()
