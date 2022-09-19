//Variable Global
/**
 * Index locating where the media is located in the data table
 */
var index = 0;

/**
 * Find the index of the first element
 * @param {*} id 
 */
 async function creationListe(id) {
    index = -1; // Car dans la boucle on fait +1 au début cela evite le beug pour la premiere incrémentation
    let flag = true;
    while (flag) {
        index++;
        if (id == data[1][index].id) {
            flag = false;
        }

    }
}

/**
 * Decrease the index by 1 and replace the content
 */
async function former() {
    if (index > 0) {
        index--;
        replaceContain();
    }

}

/**
 * Increases index by 1 and replaces content
 */
async function next() {
    if (index < data[1].length -1) {
        index++;
        replaceContain();
    }

}

/**
 * Resets the content and replaces it with the new one
 */
async function replaceContain() {
    resetContainer();
    const photo = document.querySelector(".lightbox_modal_media");
    const photographerModel = photoCardFactory(data[1][index], data[0]);
    const userCardDOM = photographerModel.getPhotoLightboxDOM();
    photo.appendChild(userCardDOM);
}

/**
 * Empty section content
 */
async function resetContainer() {
    const photo = document.querySelector(".lightbox_modal_media");
    if (data[1][index]) {
        if (photo != "") {
            photo.innerHTML = "";
        }
    }
}

/**
 * Open the Lightbox modal and listen for keyboard events.
 * @param {*} id 
 */
async function displayLightbox(id) {
    const lightbox_modal = document.getElementById("lightbox_modal");
    console.log(id);

    creationListe(id);
    replaceContain()
    
    lightbox_modal.style.display = "flex";
    document.documentElement.style.overflow = 'hidden';
}

/**
 * Close the Lightbox modal.
 */
async function closeLightbox() {
    const lightbox_modal = document.getElementById("lightbox_modal");
    resetContainer();
    lightbox_modal.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}

//Dans la fonction pour quelle ne marche que si le display est ouvert
document.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    if (nomTouche === 'ArrowLeft') {
        former()
    }

    else if ((nomTouche === 'ArrowRight')) {
        next();
    } else if ((nomTouche === 'Escape')){
        closeLightbox();
    }
});