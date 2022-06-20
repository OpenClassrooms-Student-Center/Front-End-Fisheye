async function getPhotographers() {
  // Récupère les données json dans le fichier photographers.json
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    return "error";
  } else {
    const data = await response.json();
    return {
      photographers: data.photographers,
    };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Créer un element article avec les données pour chaque photographe
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    photographersSection.on;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
