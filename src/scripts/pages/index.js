import "core-js/stable";
import "regenerator-runtime/runtime";

import '../../scss/main.scss';
import { getPhotographers } from '../utils/fetch';
import { displayDataAll } from '../data/displayData';


async function initMain() {
    // Try to get data from photographes if error then redirect to 404 page
    try {
        const photographers = await getPhotographers();
        displayDataAll(photographers, ".photographer_section");
        console.log("Page initialiser avec succès depuis initMain()");
    } catch (e) {
        console.error(e);
        // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
        // Atm 404 error page doesn't exists must be write later
        console.error("Rediriger vers la page 404");
    }
}

initMain();
