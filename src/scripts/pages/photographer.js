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

        console.log("Section profile initié avec succès depuis initProfile()");
        initContactForm(photographerSelected);

    } catch (e) {
        console.error(e);
        // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
        // Atm 404 error page doesn't exists must be write later
        console.log("Rediriger vers la page 404");
    }

}

async function initContactForm(photographerSelected) {
    try {
        const contactFormModal = modalMaster("body", "header", "main", "contact_modal"); // Create a Model Master
        const modalPage = contactFormModal.modalPage; // Get modelPage Object

        contactFormModal.addContactFormListener(modalPage); // Add specific listener to Contact Form Modal

        const titleModal = `Contactez-moi ${photographerSelected.name}`; // Build the title Modal
        contactFormModal.setTitleModal(modalPage, "h2", titleModal);  // Set the title Modal

        console.log("Formulaire contact initié avec succès depuis initContactForm()");
    }
    catch (e) {
        console.error(e);
        // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
        // Atm 404 error page doesn't exists must be write later
        console.log("Rediriger vers la page 404");
    }
}


async function initMedia(idURL) {
    // Try to get data from media if error then redirect to 404 page
    try {

        // Build Medias Data
        const medias = await getMedias();
        displayMedia(medias.sort(sortByLikes), ".media_section", idURL); // Sort by default by likes
        // End build Medias Data

        // Init selectFilter Component and his behavior, need to provide the Data to filter
        selectFilterComponent(medias, idURL);


        console.log("Section média initié avec succès depuis initMain()");

    } catch (e) {
        console.error(e);
    }

}


async function initMain() {
    // We Wait for getUrlParameter() to be complete then we run tasks for generate page
    const idURL = await getUrlParameter("id");
    initProfile(idURL);
    initMedia(idURL);
}


initMain(); 
