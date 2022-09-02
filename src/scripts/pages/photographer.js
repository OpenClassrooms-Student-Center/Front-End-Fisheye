import '../../scss/main.scss';
import { getPhotographers, getMedias } from '../utils/fetch';
import { displayData } from '../pages/displayData';
import { displayMedia } from '../pages/displayMedia';
import { getUrlParameter } from '../utils/getUrlParameter';
import { sortByLikes } from '../utils/sortBy';
import { selectFilterComponent } from '../utils/selectFilter';
import { modalMaster } from '../utils/modalForm';


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
        // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
        // Atm 404 error page doesn't exists must be write later
        console.log("Rediriger vers la page 404");
    }
}

async function initContactForm() {
    try {
        const contactForm = modalMaster("body","main","contact_modal"); // Create a contact Form object
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

// We init main page and contactForm in parallel so we don't use await there for fast response
initMain();
initContactForm();


