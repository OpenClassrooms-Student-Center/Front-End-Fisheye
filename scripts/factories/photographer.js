
// --------------- FACTORY PATTERN POUR GERER LA CREATION D'UNE CARTE D'UN PHOTOGRAPHE --------------- 

import { createHTML as createPhotographerHomeCard } from "../../templates/photographersHome.js";
import photographerProfile from "../../templates/photographerProfile.js";


/* Choisis la méthode de création du bloc d'informations du photographe 
    Paramètres :
        - Un objet représentant les informations d'un photographe
    Renvoie :
        - la fonction retenue
*/
function photographerFactory(data) {

    let newData = Object.assign(data)
    const picture = `assets/photographers/${newData.portrait}`;
    newData.picture = picture

    /* Crée le bloc HTML d'informations du photographe 
        Paramètres :
            - Un booléen indiquand si l'on est sur la page de profil
        Renvoie :
            - Le bloc d'informations
    */    
    function getUserCardDOM(profileScreen=false) {

        let userCardDOM;

        if(profileScreen) {
            userCardDOM = photographerProfile.createHTML(newData)
        } else {
            userCardDOM = createPhotographerHomeCard(newData)
        }

        return userCardDOM
    }

    return { getUserCardDOM }
}


export default photographerFactory