import { displayLightbox , closeLightbox, next, former} from "../utils/lightbox.js"

async function eventLightbox(){
    let images = document.getElementsByClassName("lienImageLightbox");
    for (let i = 0; i < images.length; i++) {
        document.getElementById(images[i].id).addEventListener('click', displayLightbox);
    }
    document.getElementById("lightbox_modal_arrow_left").addEventListener('click', former);
    document.getElementById("lightbox_modal_arrow_right").addEventListener('click', next);
    document.getElementById("lightbox_modal_close").addEventListener('click', closeLightbox);
}

export {eventLightbox}