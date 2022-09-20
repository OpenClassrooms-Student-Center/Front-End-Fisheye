/*
Code JavaScript lié à la page photographer.html
*/


import { initFiltre, sortData } from "../utils/filtre.js";
import { getData, getId } from "../utils/data.js";
import {displayDataPhotographer, displayImage,
    displayPrice, displayContactName, urlForm} from "../utils/display.js";
import { displayModal, closeModal, validate } from "../utils/contactForm.js";
import { eventLightbox } from "../utils/evenement.js";

var data;
var nblikes = 0;

function sumLike(photos){
    let sumlike = 0;
    photos.forEach(function(photo){
        sumlike += photo.likes; 
    });
    nblikes = sumlike;
}

async function displayLikes(nblikes){
    let p = document.querySelector(".section-stat-like-nombre");
    p.textContent = nblikes;
}


// eslint-disable-next-line no-unused-vars
async function like(element){
    console.log(element);
    if (!(element.className == 'liked')){
        element.innerText = Number(element.innerText) + 1;
        element.setAttribute('class', 'liked');
        nblikes++;
        displayLikes();
    } else {
        element.innerText = Number(element.innerText) - 1;
        element.setAttribute('class', '');
        nblikes--;
        displayLikes();
    }
}



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
    console.log(document.getElementById("button_contact"));
    document.getElementById("button_contact").addEventListener('click', displayModal);
    document.getElementById("close_modal_image").addEventListener('click', closeModal);
    document.getElementById("reserve").addEventListener('submit', validate);
    eventLightbox();
}

init();

export {data};