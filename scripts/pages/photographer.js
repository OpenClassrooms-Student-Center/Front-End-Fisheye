//Mettre le code JavaScript lié à la page photographer.html
//meme structure que pour index.js
let id = new URLSearchParams(window.location.search).get("id");
console.log(id);

//------------------------------------------------------------------------
async function getPhotographers() {
  //récupération des photographes
  const photographersResponse = await fetch("photographers.json");
  const photographersData = await photographersResponse.json();
  console.log("photographersData", photographersData);

  return photographersData;
}

//------------------------------------------------------------------------

async function displayData(photographers) {
  //création de la section photographes
  const photographerInfo = document.querySelector(".photographer_info");

  //boucle sur le json
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    //ajout des éléments à la classe "photographer_info"
    photographerInfo.appendChild(userCardDOM);
  });
}
//------------------------------------------------------------------------

async function init() {
  // Récupère les datas des photographes
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
    console.log(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();

// Define Photographer Pages class
// class photographerPage{
//     constructor(){

//     }
// }
