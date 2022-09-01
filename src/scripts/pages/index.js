import '../../scss/main.scss';
import { getPhotographers } from '../utils/fetch';
import { displayData } from '../pages/displayData';

async function initMain() {
    // Try to get data from photographes if error then redirect to 404 page
    try {
        const photographers = await getPhotographers();
        displayData(photographers, ".photographer_section");
        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
         // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
         // Atm 404 error page doesn't exists must be write later
        console.log("Rediriger vers la page 404");
    }
}

initMain();
