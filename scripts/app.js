import { displayData } from "./factories/photographer.js";

// fonction pour recuperer les données du json
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let response = await fetch("./data/photographers.json");
  let data = await response.json();
console.dir(data)
  return data;
}

// Récupère les datas des photographes
const { photographers } = await getPhotographers();
displayData(photographers);
