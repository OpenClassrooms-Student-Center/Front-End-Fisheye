import '../../scss/main.scss';
import { getPhotographers, getMedias } from '../utils/fetch';
import { displayData } from './displayData';
import { displayMedia } from './displayMedia';
import { getUrlParameter } from '../utils/getUrlParameter';
import { sortByLikes } from '../utils/sortBy';
import { selectFilterComponent } from '../utils/selectFilter';
import * as contactForm from '../utils/contactForm';


async function initMain() {
    // Try to get data from photographers & media if error then redirect to 404 page
    try {
        // SET Photographer Profile DATA
        const idURL = await getUrlParameter("id");
        const photographers = await getPhotographers();
        displayData(photographers, ".photograph_header", idURL);
        // END SET Photographer Profile Data

        // Build Medias Data
        const medias = await getMedias();
        displayMedia(medias.sort(sortByLikes), ".media_section", idURL); // Sort by default by likes
        // End build Medias Data

        // Init selectFilter Component and his behavior, need to provide the Data to filter
        selectFilterComponent(medias, idURL);

        console.log("Page principal initié avec succès depuis initMain()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

async function initContactForm() {
    try {
        document.getElementById("openModal").addEventListener("click", function () {
            contactForm.displayModal();
        });
        document.getElementById("closeModal").addEventListener("click", function () {
            contactForm.closeModal();
        });
        console.log("Formulaire contact initié avec succès depuis initContactForm()");
    }
    catch (e) {
        console.error(e);
    }
}


initMain(); // Init Main Page
initContactForm();  // Init work about ContactForm 