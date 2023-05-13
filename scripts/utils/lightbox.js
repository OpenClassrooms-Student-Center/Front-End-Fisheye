const Body = document.querySelector("#main-photographer");
const lightboxBG = document.querySelector(".lightbox-Bg");
const lightbox = document.querySelector(".lightbox")//;
const lightboxMediaContainer = document.querySelector(".lightbox_media-Container");
const lightboxMediaSlider = document.querySelector(".lightbox_media-slider");
const lightbox_Close_btn = document.querySelector(".lightbox_Close-btn");
const lightboxArrowLeft = document.querySelector(".next-Btn");
const lightboxArrowRight = document.querySelector(".prev-Btn");
const mediaArray = Array.from(document.querySelectorAll(".lightbox_media-card"));


///////////////////////Event listener///////////////////////////

// Écouteur d'événement pour fermer la lightbox
lightbox_Close_btn.addEventListener("click", (e) => {
    if ((e).target === lightbox_Close_btn|| e.key === "Escape") {
        closeLightBox();
    }
});

// Écouteurs d'événements pour les flèches gauche et droite
lightboxArrowLeft.addEventListener("click", () => {
    switchToPreviousMedia();
});

lightboxArrowRight.addEventListener("click", () => {
    switchToNextMedia();
});


let currentIndex = 0; // Cet index pointera vers l'élément média actuellement affiché

function switchToNextMedia() {
    // Incrémente l'index courant et boucle s'il dépasse la fin du tableau
    currentIndex = (currentIndex + 1) % mediaArray.length;
    // Obtient le nouveau média
    const newMedia = mediaArray[currentIndex];
    // Met à jour l'affichage du média
    lightboxMediaSlider.innerHTML = newMedia.outerHTML;

    if (currentIndex === mediaArray.length - 1) {
        lightboxArrowRight.classList.add("hidden");
    } else {
        lightboxArrowRight.classList.remove("hidden");
    }

    if (currentIndex === 0) {
        lightboxArrowLeft.classList.add("hidden");
    } else {
        lightboxArrowLeft.classList.remove("hidden");
    }
}

function switchToPreviousMedia() {
    // Décrémente l'index courant et boucle s'il dépasse le début du tableau
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = mediaArray.length - 1;
    }

    // Obtient le nouveau média
    const newMedia = mediaArray[currentIndex];
    // Met à jour l'affichage du média
    lightboxMediaSlider.innerHTML = newMedia.outerHTML;

    if (currentIndex === 0) {
        lightboxArrowLeft.classList.add("hidden");
    } else {
        lightboxArrowLeft.classList.remove("hidden");
    }

    if (currentIndex === mediaArray.length - 1) {
        lightboxArrowRight.classList.add("hidden");
    } else {
        lightboxArrowRight.classList.remove("hidden");
    }
}




// Fonction pour ouvrir la lightbox
function openLightBox() {
    Body.setAttribute("aria-hidden", "true"); // Cache le body
    lightboxBG.classList.remove("hidden"); // Affiche la lightbox
    lightboxBG.classList.add("visible");
    lightboxBG.setAttribute("aria-hidden", "false");
    
}

//Fonction clos lightbox
function closeLightBox() {
    Body.setAttribute("aria-hidden", "false"); // Cache le body
    lightboxBG.classList.remove("visible"); // Affiche la lightbox
    lightboxBG.classList.add("hidden");
    lightboxBG.setAttribute("aria-hidden", "true");
}

export {
    openLightBox,
    closeLightBox,
    lightbox_Close_btn,
    lightboxBG,
    lightbox,
    lightboxMediaContainer,
    lightboxMediaSlider
};
