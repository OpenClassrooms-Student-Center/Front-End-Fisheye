function displayModal() {
    const contact = document.getElementById('contact_modal');
    contact.style.display = 'flex';
}

function closeModal() {
    const contact = document.getElementById('contact_modal');
    contact.style.display = 'none';
}

function displayLightbox(i) {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'flex';
    const lightboxImg = document.querySelector('.lightbox_img');
    while (lightboxImg.firstChild) {
        lightboxImg.removeChild(lightboxImg.lastChild);
    }
    updateLightboxData(media[i], i)
}

function previousPhoto(i) {
    if (i === 0) {
        i = media.length;
    }
    displayLightbox(i - 1)
}

function nextPhoto(i) {
    if (i === media.length - 1) {
        i = -1;
    }
    displayLightbox(i + 1)
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'none';
}
