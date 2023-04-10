// DOM elements
const modalLightboxElt = document.getElementById("lightbox-modal");
const containerElt = document.querySelector(".carousel-container");
const slidesToScroll = 1;
const slidesVisibles = 1;
let currentItem = 0; 
    
// functions 
function openlightboxModal() {
	modalLightboxElt.style.display = "block";
    setWidthCarouselItem();
}

function closeLightboxModal() {
    modalLightboxElt.style.display = "none";
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






