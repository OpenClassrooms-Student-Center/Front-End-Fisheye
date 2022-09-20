import { displayLightbox , closeLightbox, next, former} from "../utils/lightbox.js";
import {displayModal, closeModal, validate} from "../utils/contactForm.js";
import {like} from "../utils/like.js"

async function eventLightbox(){
    let images = document.getElementsByClassName("lienImageLightbox");
    for (let i = 0; i < images.length; i++) {
        document.getElementById(images[i].id).addEventListener('click', displayLightbox);
    }
    document.getElementById("lightbox_modal_arrow_left").addEventListener('click', former);
    document.getElementById("lightbox_modal_arrow_right").addEventListener('click', next);
    document.getElementById("lightbox_modal_close").addEventListener('click', closeLightbox);
}

async function eventModal(){
    document.getElementById("button_contact").addEventListener('click', displayModal);
    document.getElementById("close_modal_image").addEventListener('click', closeModal);
    document.getElementById("reserve").addEventListener('submit', validate);
}

async function eventLike(){
    let likeList = document.getElementsByClassName("card-info-like");
    for (let i = 0; i < likeList.length; i++) {
        likeList[i].addEventListener('click', like);
    }
}


export {eventLightbox, eventModal, eventLike}