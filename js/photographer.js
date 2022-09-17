import Api from './class/Api.js'
import Photographer from './class/Photographer.js'
import FormContact from './class/FormContact.js'

/* ENG: Targets */
/* FRA: Cibles */

const photographerTarget = document.getElementById('photographer-profile');

/* ENG: Functions */
/* FRA: Fonctions */

const dispatch = (element, target) => {
    if (element.id == target.id) {
        target.parentNode.replaceChild(element, target);
    } else {
        target.appendChild(element);
    }
}

const getParam = (param) => {
    let search = window.location.search
    let result = new URLSearchParams(search).get(param);

    if (result != null) {
        return result
    }

    return false
}

/* ENG/FRA: Api initialization */

try {
    await Api.init();
} catch (error) {
    console.log(error);
}

/* ENG: Retrieve the photographer id from the get params */
/* FR: Récuperation de l'id du photographe provenant du parametre de la méthode GET */
const photographerId = getParam('id');

/* ENG: Create the photographer element */
/* FR: Création de l'element photographe */
let photographer = new Photographer(Api.getPhotographerById(photographerId));

/* ENG: Inject photographer */
/* FRA: Injecter du photographe */
Photographer.instances.forEach(photographer => {
    dispatch(photographer.element, photographerTarget);
})

/* ENG: Contact Form Initialization */
/* FR: Initialisation du formulaire de contact */
FormContact.init();
