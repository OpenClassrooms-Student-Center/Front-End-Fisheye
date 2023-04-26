"use_strict";

// DOM elements
const modalLightboxElt = document.getElementById("lightbox-modal");
const carouselContainerElt =  document.querySelector(".carousel-container");
const slidesToScroll = 1;
const slidesVisibles = 1;
let currentItem = 0;
    
function openLightboxWithMouse() {
	modalLightboxElt.style.display = "block";
    const closeLightboxElt = document.querySelector(".close-lightbox-modal");
    closeLightboxElt.focus();
    mainElt.setAttribute("aria-hidden","true");
    modalLightboxElt.setAttribute("aria-hidden","false");

    const idClickedMedia = document.querySelector(".media button:hover > span").textContent;
    displayDataLightbox(idClickedMedia);
}

function closeLightbox() {
    modalLightboxElt.style.display = "none";
    mainElt.setAttribute("aria-hidden","false");
    modalLightboxElt.setAttribute("aria-hidden","true");
    carouselContainerElt.innerHTML = "";
}

// close modal on keydown "echap" keyborad button
function closeLightboxWithKeyboard() {
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "escape") {
            closeLightbox();
        }
    });
    carouselContainerElt.innerHTML = "";
}

// navigate on lightbox with keyboard arrow keys
function navigateOnLightboxWithKeyboard() {
    document.addEventListener("keydown", function(e) {
        if(e.key.toLowerCase() === "arrowright") {
            next();
        } else if(e.key.toLowerCase() === "arrowleft") {
            prev();
        }
    });
}

/**
 * 
 * @param {number} idClickedMedia - return clicked media id
 */
async function displayDataLightbox(idClickedMedia) {
    const { media } = await getPhotographers();
    const photographerMedia = getPhotographerMedia(media);

    const sliceEnd = photographerMedia.length;
    const KeyClickedMedia =  getKeyClickedMedia(photographerMedia, idClickedMedia);
    const slicedMedia = photographerMedia.slice(KeyClickedMedia);
    slicedMedia.reverse();
    slicedMedia.forEach(media => {
        photographerMedia.unshift(media);
    });

    const finalArrPhotographerMedia = photographerMedia.slice(0,sliceEnd);
    finalArrPhotographerMedia.forEach(clickedMedia => {
        photographerLightboxFactory(clickedMedia);
    });

    setWidthCarouselItem();
}

/**
 * 
 * @param {object} photographerMedia 
 * @param {number} idClickedMedia
 * @returns 
 */
function getKeyClickedMedia(photographerMedia, idClickedMedia) {
    for (const [key, value] of photographerMedia.entries()) {
        if(value.id == idClickedMedia) {
            return key;
        }
    }
}

function setWidthCarouselItem() {
    let itemsElt = document.querySelectorAll(".carousel-item");
    let ratio = itemsElt.length / slidesVisibles;
    carouselContainerElt.style.width = (ratio * 100) + "%";
    itemsElt.forEach(item => item.style.width = ((100 / slidesVisibles) / ratio) + "%");
}

function next() {
    scrollToItem(currentItem + slidesToScroll);
}

function prev() {
    scrollToItem(currentItem - slidesToScroll);
}

/**
 * 
 * @param {number} index
 */
function scrollToItem(index) {
    let itemsElt = document.querySelectorAll(".carousel-item");

    if (index < 0 ) {
        index = itemsElt.length - slidesVisibles;
    } else if (index >= itemsElt.length) {
        index = 0;
    }

    let translateX = index * -100 / itemsElt.length;
    carouselContainerElt.style.transform = "translate(" + translateX + "%)";
    currentItem = index;
}

closeLightboxWithKeyboard();
navigateOnLightboxWithKeyboard();




