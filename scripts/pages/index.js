async function getPhotographers() {
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
  return data;
}

async function displayData(photographers) {
  const $photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    $photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");

  if (photographerId) {
    const photographer = await getPhotographerById(photographerId);
    const photographerTemplate = photographerDetailTemplate(photographer);
    const $main = document.getElementById("main");
    $main.appendChild(photographerTemplate);
  } else {
    const { photographers } = await getPhotographers();
    displayData(photographers);
  }
}

init();
