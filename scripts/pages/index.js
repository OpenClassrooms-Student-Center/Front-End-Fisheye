import { photographerFactory } from "../factories/photographerFactory.js"
import { createHeader } from "../templates/header.js"

async function getPhotographers() {
  let photographers = []
  await fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers
      const photographersPhotos = data.media
      // console.log(photographersPhotos)
    })
    .catch((err) => {
      console.error(err)
    })
  return photographers
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    document
      .querySelector(".photographer_section")
      .appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes et crée le header
  createHeader("mainPage")
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()
