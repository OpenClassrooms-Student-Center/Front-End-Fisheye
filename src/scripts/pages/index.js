import '../../scss/main.scss';
import '../utils/fetch.js';



async function init() {
    // Try to get data from photographes if error then redirect to 404 page
    try {
        const { photographers } = await getPhotographers();
        displayData(photographers, ".photographer_section");
        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
