/*import {media, updateLightboxData} from '../../pages/photographer/photographer.js'*/

export function displayModal() {
    const contact = document.getElementById('contact_modal');
    contact.style.display = 'flex';
}

/*
function displayLightbox(i) {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'flex';
    const lightboxImg = document.querySelector('.lightbox_img');
    while (lightboxImg.firstChild) {
        lightboxImg.removeChild(lightboxImg.lastChild);
    }
    updateLightboxData(media[i], i)
}

export function previousPhoto(i) {
    if (i === 0) {
        i = media.length;
    }
    displayLightbox(i - 1)
}

export function nextPhoto(i) {
    if (i === media.length - 1) {
        i = -1;
    }
    displayLightbox(i + 1)
}

export function closeLightbox() {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'none';
}
*/
