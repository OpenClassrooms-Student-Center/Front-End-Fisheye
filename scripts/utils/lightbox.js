// DOM elements
const modalLightboxElt = document.getElementById("lightbox-modal");
const containerElt = document.querySelector(".carousel-container");
const slidesToScroll = 1;
const slidesVisibles = 1;
let currentItem = 0; 
    
function openlightboxModal() {
	modalLightboxElt.style.display = "block";
    setWidthCarouselItem();
    mainElt.setAttribute("aria-hidden","true");
    modalLightboxElt.setAttribute("aria-hidden","false");

    document.addEventListener("keydown", function(e) {
        if(e.keyCode === 39) {
            next();
        } else if(e.keyCode === 37) {
            prev();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            closeLightboxModal();
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