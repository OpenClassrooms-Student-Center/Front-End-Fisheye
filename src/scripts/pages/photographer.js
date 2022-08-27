import '../../scss/main.scss';
import { getPhotographers, getMedias } from '../utils/fetch';
import { displayData } from './displayData';
import { displayMedia } from './displayMedia';
import { getUrlParameter } from '../utils/getUrlParameter';




function sortbyLikes(a, b) {
    if (a.likes > b.likes) {
        return -1
    }
    if (a.likes < b.likes) {
        return 1
    }
    return 0;
}

async function init() {
    // Try to get data from photographers & media if error then redirect to 404 page
    try {
        const idValue = await getUrlParameter("id");
        const photographers = await getPhotographers();
        displayData(photographers, ".photograph_header", idValue);

        const medias = await getMedias();

        displayMedia(medias.sort(sortbyLikes), ".media_section", idValue);

        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
