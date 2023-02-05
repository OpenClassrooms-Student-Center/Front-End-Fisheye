
// --------------- FACTORY PATTERN POUR GERER LA CREATION D'UNE CARTE D'UN PHOTOGRAPHE --------------- 

import { createHTML as createPhotographerHomeElements } from "../../templates/photographersHome.js";
import { createHTML as createPhotographerProfileElements } from "../../templates/photographerProfile.js";


/* Crée une fonction de factory pour gérer la création du bloc d'informations d'un photographe
    Paramètres :
        - Un objet représentant les informations d'un photographe
    Renvoie :
        - la fonction retenue
*/
function photographerFactory(data) {

    let newData = Object.assign(data)
    const picture = `assets/photographers/${newData.portrait}`;
    newData.picture = picture

    /* Crée le bloc HTML d'informations du photographe en fonction de la page visitée
        Paramètres :
            - Un booléen indiquand si l'on est sur la page de profil
        Renvoie :
            - Le bloc d'informations
    */    
    function getUserCardDOM(profileScreen=false) {

        let userCardDOM;

        if(profileScreen) {
            userCardDOM = createPhotographerProfileElements(newData)
        } else {
            userCardDOM = createPhotographerHomeElements(newData)
        }

        return userCardDOM
    }

    return { getUserCardDOM }
}


export default photographerFactory