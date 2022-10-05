import { photographerFactory } from "../factories/photographerFactory.js"

async function getPhotographers() {
  let photographers = []
  await fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      photographers = data.photographers
      // const photographersPhotos = photographersData.media
      // console.log(photographers)
    })
    .catch((err) => {
      console.error(err)
    })
  return photographers
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(
    ".photographer_section"
  )
  console.log(photographers)
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()
