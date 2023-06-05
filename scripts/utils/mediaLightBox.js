// LIGHTBOX
const launchLightBox = (id, event, index) => {
    event.stopPropagation();

    const media = document.getElementById(`media-${id}`);
    const mediaModal = document.getElementById(`media-modal-${id}`);

    if (!mediaModal.classList.contains('light-box')) {
        media.setAttribute('aria-hidden', 'true');
        media.setAttribute('tabindex', '-1');
        mediaModal.classList.add('light-box');
        mediaModal.setAttribute('aria-hidden', 'false');
        mediaModal.setAttribute('tabindex', '0');
        mediaModal.focus();
        currentIndex = index;
    } else {
        mediaModal.classList.remove('light-box');
        media.setAttribute('aria-hidden', 'false');
        media.setAttribute('tabindex', '0');
        mediaModal.setAttribute('aria-hidden', 'true');
        mediaModal.setAttribute('tabindex', '-1');
        media.focus();
    }
}

const showNextMedia = (event) => {
    event.stopPropagation();

    const media = document.getElementsByClassName('media-figure');
    if (media.length > 0) {
        currentIndex = (currentIndex + 1) % media.length;
        showMediaAtIndex(currentIndex);
    }
}

const showPreviousMedia = (event) => {
    event.stopPropagation();

    const media = document.getElementsByClassName('media-figure');
    if (media.length > 0) {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        showMediaAtIndex(currentIndex);
    }
}

const showMediaAtIndex = (currentIndex) => {
    const elmt = document.getElementsByClassName(`media-modal`);
    const currentElmt = elmt[currentIndex];

    // Fermer toutes les autres light-box
    const lightBoxes = document.querySelectorAll('.light-box');
    lightBoxes.forEach(lightBox => {
        lightBox.classList.remove('light-box');
    });

    // Ouvrir la light-box du média sélectionnée
    currentElmt.classList.add('light-box');
    currentElmt.tabIndex = 0;
}

document.addEventListener('keydown', (event) => {
    const regex = /\d+/g;
    const lightBoxOpen = document.querySelector('.light-box');
    if (lightBoxOpen) {
        if (event.key === 'ArrowRight') {
            showNextMedia(event);
        } else if (event.key === 'ArrowLeft') {
            showPreviousMedia(event);
        } else if (event.key === 'Escape') {
            const mediaId = lightBoxOpen.id.match(regex);
            launchLightBox(mediaId, event);
        }
    }
});