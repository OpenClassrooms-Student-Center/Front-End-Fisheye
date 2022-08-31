import '../../scss/main.scss';
import { getPhotographers, getMedias } from '../utils/fetch';
import { displayData } from './displayData';
import { displayMedia } from './displayMedia';
import { getUrlParameter } from '../utils/getUrlParameter';
import { sortByLikes } from '../utils/sortBy';
import { selectFilterComponent } from '../utils/selectFilter';



async function init() {
    // Try to get data from photographers & media if error then redirect to 404 page
    try {
        console.log(process.env);
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


        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
