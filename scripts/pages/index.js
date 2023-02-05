
// --------------- FICHIER DE CONTRÔLE DE LA PAGE D'ACCUEIL --------------- 



/****************************** MODULES **************************************** */
/********************************************************************** */
import { fetchDataFromApi } from "../services/Api.js";
import photographerFactory from "../factories/photographer.js";
import updateLoaderText from "../utils/loaders.js";


/****************************** PROCÉDURES **************************************** */
/********************************************************************** */

init();


/****************************** FUNCTIONS **************************************** */
/********************************************************************** */

/* Lance les différentes étapes nécessaires pour le bon affichage de la page
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
async function init() {
    
    // Pour les SR : indique que la page est chargée
    setTimeout(updateLoaderText, 3000)

    const fetchingURL = '../../data/photographers.json'; 

    const data = await fetchDataFromApi(fetchingURL).catch(error => {
        console.log(error)
        throw new Error()
    })

    const { photographers } = data
    await displayPhotographers(photographers).catch(error => console.log(error))
    
};


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