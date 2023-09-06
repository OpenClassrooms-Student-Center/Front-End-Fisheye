//Fonction asynchrone avec l'API fetch qui récupère les données des photographes 
//Asynchronous function with the fetch API which retrieves data from photographers
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  //répéte sur chaque photographe dans les données récupérées pour créer une card
  //repeat on each photographer in the retrieved data to create a card
  photographers.forEach((photographers) => {
    const photographerModel = photographerTemplate(photographers);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes en appelant la fonction getPhotographers 
  // Get data from photographers by calling the getPhotographers function
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
