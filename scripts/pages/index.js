// let json = require('/Users/Documents/workspace/test.json');

function storeMedias(json) {
  console.log(json["media"]);
}

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  var photographers = [];

  var storePhotographers = () => {};
  await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      photographers = json["photographers"];
    });

  // et bien retourner le tableau photographers seulement une fois

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
