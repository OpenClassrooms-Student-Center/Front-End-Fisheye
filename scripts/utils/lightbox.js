"use_strict";

// DOM elements
const modalLightboxElt = document.getElementById("lightbox-modal");
const containerElt = document.querySelector(".carousel-container");
const slidesToScroll = 1;
const slidesVisibles = 1;
let currentItem = 0; 
    
function openlightboxModal() {
	modalLightboxElt.style.display = "block";
    mainElt.setAttribute("aria-hidden","true");
    modalLightboxElt.setAttribute("aria-hidden","false");
    setWidthCarouselItem();
    closeLightboxWithKeyboard();
    navigateOnLightboxWithKeyboard();
}

// close modal on keydown "echap" keyborad button
function closeLightboxWithKeyboard() {
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "escape") {
            closeLightboxModal();
        }
     });
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

function closeLightboxModal() {
    modalLightboxElt.style.display = "none";
    mainElt.setAttribute("aria-hidden","false");
    modalLightboxElt.setAttribute("aria-hidden","true");
}

function setWidthCarouselItem() {
    let itemsElt = document.querySelectorAll(".carousel-item");
    let ratio = itemsElt.length / slidesVisibles;
    containerElt.style.width = (ratio * 100) + "%";
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
    containerElt.style.transform = "translate(" + translateX + "%)";
    currentItem = index;
}