// LIGHTBOX
const launchLightBox = (id, event, index) => {
    event.stopPropagation();

    const media = document.getElementById(`media-${id}`);
    const elmts = document.querySelectorAll('.element-light-box');

    if (!media.classList.contains('light-box')) {
        media.classList.add('light-box');
        elmts.forEach(elmt => elmt.style.display = 'block');
        currentIndex = index;
    } else {
        media.classList.remove('light-box');
        elmts.forEach(elmt => elmt.style.display = 'none');
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
    const media = document.getElementsByClassName('media-figure');

    const currentMedia = media[currentIndex];
    const currentElmt = currentMedia.querySelector('.media-figure > div');

    // Fermer toutes les autres light-box
    const lightBoxes = document.querySelectorAll('.light-box');
    lightBoxes.forEach(lightBox => {
        lightBox.classList.remove('light-box');
        const elements = lightBox.querySelectorAll('.element-light-box');
        elements.forEach(element => element.style.display = 'none');
    });

    // Ouvrir la light-box du média sélectionnée
    currentElmt.classList.add('light-box');
    currentElmt.tabIndex = 0;
    const elements = currentElmt.querySelectorAll('.element-light-box');
    elements.forEach(element => element.style.display = 'block');
}

const launchLightBoxWithKey = (id, event, index) => {
    if (event.key === 'Enter') {
        launchLightBox(id, event, index);
    }
}