export function displayModal() {
    const contact = document.getElementById('contact_modal');
    contact.style.display = 'flex';
    const close = document.getElementById('close_modal');
    close.onclick = closeModal;
    const button = document.querySelector('.validate');
    button.onclick = validate;
}

function validate() {
    const form = document.forms['contact'];
    const first = document.forms['contact'] ['first'];
    const last = document.forms['contact'] ['last'];
    const mail = document.forms['contact'] ['mail'];
    const message = document.forms['contact'] ['message'];
    console.log("Formulaire : " + form.name);
    console.log("Prénom : " + first.value);
    console.log("Nom : " + last.value);
    console.log("Email : " + mail.value);
    console.log("Message : " + message.value);
    return false;
}

export function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
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
