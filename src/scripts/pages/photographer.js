import "core-js/stable";
import "regenerator-runtime/runtime";

import '../../scss/main.scss';
import { getPhotographers, getMedias } from '../utils/fetch';
import { displayData } from '../data/displayData';
import { displayMedia } from '../data/displayMedia';
import { getUrlParameter } from '../utils/getUrlParameter';
import { sortByLikes } from '../utils/sortBy';
import { selectFilterComponent } from '../utils/selectFilter';
import { modalMaster } from '../utils/modalMaster';




async function initProfile(idURL) {
    // Try to get data from photographers if error then redirect to 404 page
    try {
        // SET Photographer Profile DATA
        const photographers = await getPhotographers();
        // Return the photographer Display
        const photographerSelected = await displayData(photographers, idURL);
        // END SET Photographer Profile Data

        if (photographerSelected) {
            console.log("Section profile initié avec succès depuis initProfile()");
            initContactForm(photographerSelected);
        }
        else {
            console.error("Error no selected photographer");


            if (process.env.NODE_ENV === 'production') {
                location.href = '404.html';
            }

        }



    } catch (e) {
        console.error(e);
        // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
        console.error("initProfile() failed redirect to 404 page");

        if (process.env.NODE_ENV === 'production') {
            location.href = '404.html';
        }

    }

}

async function initContactForm(photographerSelected) {
    try {
        const contactFormModal = modalMaster("body", "header", "main", "contact_modal"); // Create a Model Master
        const modalPage = contactFormModal.modalPage; // Get modelPage Object

        contactFormModal.addContactFormListener(modalPage); // Add specific listener to Contact Form Modal

        const titleModal = photographerSelected.name; // Build the title Modal
        contactFormModal.setTitleModal(modalPage, "#dialogTitle", titleModal);  // Set the title Modal

        console.log("Formulaire contact initié avec succès depuis initContactForm()");
    }
    catch (e) {
        console.error(e);
        // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
        console.error("initContactForm() failed redirect to 404 page");

        if (process.env.NODE_ENV === 'production') {
            location.href = '404.html';
        }
    }
}

async function initLightbox(selectedMedias) {
    try {
        const lightBox = modalMaster("body", "header", "main", "lightbox_modal"); // Create a Model Master
        const modalPage = lightBox.modalPage; // Get modelPage Object

        // This add listener about lightbox modal on all link with Media Displayed at photographer page
        lightBox.addLightboxListener(modalPage, ".media_section a", selectedMedias);

        console.log("Popup LightBox initié avec succès depuis initLightBox()");
    }
    catch (e) {
        console.error(e);

    }

}

export async function initMedia(idURL, sortBy) {
    // Try to get data & build section media if error then redirect to 404 page
    try {

        // Build Medias 
        const medias = await getMedias();
        const selectedMedias = await displayMedia(medias.sort(sortBy), ".media_section", idURL); // SortBy must be a function of sort
        // End build Medias 
        console.log("Section média initié avec succès depuis initMedia()");

        initLightbox(selectedMedias);  // Initialize LightBox Modal with selected medias
    } catch (e) {
        console.error(e);
    }

}


async function initMain() {
    const idURL = await getUrlParameter("id");
    initProfile(idURL); // Init Profile section after getUrlParameter() completed
    await initMedia(idURL, sortByLikes); // Get Medias & Init Media Section by Likes "import { sortByLikes } from '../utils/sortBy';
    selectFilterComponent(idURL); // Initialize Select filter component after initMedia() completed
}


initMain(); 
