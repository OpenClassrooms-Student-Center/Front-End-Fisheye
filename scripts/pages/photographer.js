// Importer la fonction getPhotographers() du fichier photographerFactory.js
import { photographerFactory } from "../factories/photographerFactory.js";




function get_ID_from_url() { // Fonction pour récupérer l'id du photographe dans l'url
  let url = window.location.search; // Récupère l'url
  let urlParams = new URLSearchParams(url); // Récupère les paramètres de l'url
  let id = urlParams.get("id"); // Récupère l'id de l'url
  return id;
}



// Affichage des elements de la page
async function displayData() {
  
      const photographer = photographerFactory(get_ID_from_url).getPhotographerData();
      const photographerMedias = photographerFactory(get_ID_from_url).getPhotographerMedia(); 
    
  };    


async function init() {// Fonction pour afficher les données du photographe dans la page

  displayData();
  
  
}

init();
export { get_ID_from_url };