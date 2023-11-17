import { getAllorOnePhotographer } from "../api/getPhotographer.js";

// async function getAllorOnePhotographer(id) {
//   const response = await fetch("data/photographers.json");
//   const data = await response.json();

//   const photographers = data.photographers
//     .filter((photographer) => !id || photographer.id === id) // Filter by id if id is provided
//     .map((photographer) => {
//       const media = data.media.filter((media) => media.photographerId === photographer.id); // Filter by photographerId
//       return { ...photographer, media };
//     });

//     console.log(photographers);

//   return { photographers };
// }

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  getAllorOnePhotographer().then(({ photographers }) => {
    displayData(photographers);
  })
}

init();
