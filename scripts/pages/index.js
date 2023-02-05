
// --------------- FICHIER DE CONTRÔLE DE LA PAGE D'ACCUEIL --------------- 

import { getDataFromApi } from "../services/Api.js";
import photographerFactory from "../factories/photographer.js";


/* Affiche les différents photographes sur la page 
    Paramètres :
        - l'objet regroupant l'ensemble des photographes et leurs infos
    Renvoie :
        - Rien
*/
async function displayPhotographers(photographers) {

    // Il s'agit de la section où les photographes sont affichés un par un
    const photographersSection = document.querySelector(".photographers_section");

    // Boucle sur chaque photographe pour lui créer la carte avec ses informations principales
    photographers.forEach((photographer) => {

        // Création de la carte du photographe via la méthode getUserCardDOM
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        photographersSection.appendChild(userCardDOM);
    });
}; 


/* Lance les différentes étapes nécessaires pour le bon affichage de la page
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
async function init() {
    
    const fetchingURL = '../../data/photographers.json'; 

    // Récupère la data des photographes
    const data = await getDataFromApi(fetchingURL).catch(error => {
        console.log(error)
        throw new Error()
    })

    const { photographers } = data
    await displayPhotographers(photographers).catch(error => console.log(error))

    // L'élément ne doit être lu qu'une seule fois au moment du chargement, on le fait donc disparaître une fois les photographes affichés
    const loadingTextElement = document.querySelector('.loading-text')
    loadingTextElement.style.display = 'none'
};

init();
