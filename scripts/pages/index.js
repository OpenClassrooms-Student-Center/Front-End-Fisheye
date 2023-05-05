async function getData() {

  const reponse = await fetch("./data/photographers.json");
  let jsonData = await reponse.json();
  console.log(jsonData);
  // retourne l'ensemble des données du fichier json
  return jsonData;
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    // envoie toutes les infos des photographes à la factory
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getData();
  displayData(photographers);
  
}

init();
