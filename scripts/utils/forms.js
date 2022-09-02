
export function displayModal() {
    const contact = document.getElementById('contact_modal');
    const close = document.getElementById('close_modal');
    close.onclick = closeModal;
    contact.style.display = 'flex';
}

export function displayLightbox() {
    const close = document.getElementById('close_lightbox');
    close.onclick = closeLightbox;
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'flex';
    const lightboxImg = document.querySelector('.lightbox_img');
    while (lightboxImg.firstChild) {
        lightboxImg.removeChild(lightboxImg.lastChild);
    }
}

export function closeLightbox() {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.display = 'none';
}

export function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}
