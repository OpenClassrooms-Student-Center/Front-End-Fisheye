/**
 * Manages the various functions allowing the proper functioning of the photographer page.
 */

import { initFiltre, sortData } from "../utils/filtre.js";
import { getData, getId } from "../utils/data.js";
import {displayDataPhotographer, displayImage,
    displayPrice, displayContactName, urlForm} from "../utils/display.js";
import { eventLightbox, eventModal, eventLike} from "../utils/evenement.js";
import {displayLikes, sumLike, nblikes} from "../utils/like.js";
var data;


/**
 * Initialize data.
 */
async function init() {
    data = await getData(getId());
    initFiltre(data);
    sortData(data);
    displayDataPhotographer(data[0]);
    displayImage(data);
    sumLike(data[1]);
    displayLikes(nblikes);
    displayPrice(data[0].price);
    displayContactName(data[0].name);
    urlForm();
    eventModal();
    eventLightbox();
    eventLike();
}

init();

export {data};