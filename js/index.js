import Api from './class/Api.js'
import Photographer from './class/Photographer.js'

/* ENG: Targets */
/* FRA: Cibles */

let photographerTarget = document.getElementById('photographers-list')

/* ENG: Functions */
/* FRA: Fonctions */

const injectElement = (element, target) => {
    target.appendChild(element)
}

/* ENG/FRA: Api initialization */

try {
    await Api.init();
} catch (error) {
    console.log(error);
}

/* ENG: Get and create all photographers */
/* FRA: Récupère et crée tous les photographes */
/* We retrieve all the photographer data and create objects through them */
Api.getAllPhotographers().forEach(photographer => new Photographer(photographer));

/* ENG: Inject photographers */
/* FRA: Injecter les photographes */
Photographer.instances.forEach(photographer => {
    /* ENG: We take the element for each photographer instance and inject to the photographerTarget which is the photographers-list element */
    /* FR: Nous prenons l'élément pour chaque instance de photographe et injectons dans le photographeTarget qui est l'élément de la liste des photographes */
    injectElement(photographer.element, photographerTarget);
});