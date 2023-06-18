// GET ID BY PARAMS
const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');

// HEADER
// PHOTOGRAPH
async function getPhotographDetails() {
    const response = await fetch('data/photographers.json');
    const photographersData = await response.json();
    const photographDetails = photographersData.photographers.find(item => item.id === parseInt(id))
    return photographDetails;
}

async function displayPhotographDetails() {
    const photograph = await getPhotographDetails();
    const photographHeader = document.querySelector(".photograph-header");
    
    const headerModel = photographHeaderFactory(photograph);
    const photographHeaderDOM = headerModel.getPhotographHeaderDOM();
    
    photographHeader.appendChild(photographHeaderDOM);

    const headerBtn = document.getElementById('header-contact-button');
    headerBtn.addEventListener('click', displayModal);
};

// MAIN
// MEDIA
async function getMediaDetails() {
    const response = await fetch('data/photographers.json');
    const mediaData = await response.json();
    const mediaDetails = [];
    
    mediaData.media.forEach(item => {
        if (item.photographerId === parseInt(id)) {
            mediaDetails.push(item);
        }
    });
    
    return mediaDetails;
}

async function getMediaLikes() {
    const mediaData = await getMediaDetails();
    let mediaNbLikes = mediaData.reduce(function (accumulator, media) {
        return accumulator + media.likes;
    }, 0)

    return mediaNbLikes;
}

async function displayPhotographMedias() {
    const mediaData = await getMediaDetails();
    const mediasContainer = document.querySelector('.medias-container');

    const mediaFactory = createMediaFactory(mediaData);
    const mediaDOM = Array.from(mediaFactory.getMediaDOM());

    mediaDOM.forEach((mediaElement) => {
        mediasContainer.appendChild(mediaElement);
    });

    // Ajouter les événements aux médias
    function resetEventListener() {

        const mediaItems = document.querySelectorAll('.media-item');
        const mediaModals = document.querySelectorAll('.media-modal');
        const regex = /\d+/g;
        
        mediaItems.forEach(mediaItem => {
            const id = mediaItem.id.match(regex);
            const media = document.getElementById(`media-${id}`);
            const mediaLikeBtn = document.getElementById(`like-${id}`);
            const index = Array.from(mediaItems).findIndex((element) => element.id === mediaItem.id);
            
            media.addEventListener('click', (event) => {
                launchLightBox(id, event, index)
            });
            media.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    launchLightBox(id, event, index)
                }
            });

            mediaLikeBtn.addEventListener('click', () => {
                incrementLikes(id);
            });
        });

        mediaModals.forEach(mediaModal => {
            const id = mediaModal.id.match(regex);
            const modalElmtCross = document.querySelector(`#media-modal-${id} > .element-light-box-cross`);
            const modalElmtArrowLeft = document.querySelector(`#media-modal-${id} > .element-light-box-arrowLeft`);
            const modalElmtArrowRight = document.querySelector(`#media-modal-${id} > .element-light-box-arrowRight`);
            
            modalElmtCross.addEventListener('click', (event) => {
                launchLightBox(id, event);
            });

            modalElmtArrowLeft.addEventListener('click', (event) => {
                showPreviousMedia(event);
            });

            modalElmtArrowRight.addEventListener('click', (event) => {
                showNextMedia(event);
            });
        });
    }

    // SORT
    function updateMediaOrder(mediaElements) {
        mediasContainer.innerHTML = '';
        mediaElements.forEach((mediaElement) => {
            mediasContainer.appendChild(mediaElement);
        });
        resetEventListener();
    }

    // Tri par popularité ou titre ou date
    function sortByPopularity() {
        const mediaFactory = createMediaFactory(mediaData, 'popularity');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        updateMediaOrder(mediaDOM);
        toggleButtonState('sort-button-popularity');
    }

    function sortByTitle() {
        const mediaFactory = createMediaFactory(mediaData, 'title');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        updateMediaOrder(mediaDOM);
        toggleButtonState('sort-button-title');
    }

    function sortByDate() {
        const mediaFactory = createMediaFactory(mediaData, 'date');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        updateMediaOrder(mediaDOM);
        toggleButtonState('sort-button-date');
    }

    // Créer les boutons et les afficher
    function toggleButtonState(buttonClass) {
        const sortButtons = document.querySelectorAll('.sort-button');
        sortButtons.forEach((button) => {
            if (button.classList.contains(buttonClass)) {
                button.classList.add('selected');
                button.ariaPressed = true;
            } else {
                button.classList.remove('selected');
                button.ariaPressed = false;
            }
        });
    }

    function createSortButton(text, buttonClass, sortByFunction) {
        const button = document.createElement('button');
        button.classList.add('sort-button', buttonClass);
        button.textContent = text;
        button.ariaLabel = `Cliquez ou appuyez sur 'Enter' pour trier les médias par : ${text}.`;
        
        button.addEventListener('click', () => {
            if (button.classList.contains('selected')) {
                toggleDropdownMenu();
            } else {
                sortByFunction();
                toggleDropdownMenu();
            }
        });
        
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (button.classList.contains('selected')) {
                    toggleDropdownMenu();
                } else {
                    sortByFunction();
                    toggleDropdownMenu();
                }
            }
        });

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-chevron-down');
        button.appendChild(icon);
      
        return button;
    }

    const popularityButton = createSortButton('Popularité', 'sort-button-popularity', sortByPopularity);
    const titleButton = createSortButton('Titre', 'sort-button-title', sortByTitle);
    const dateButton = createSortButton('Date', 'sort-button-date', sortByDate);

    // Créer le menu dropdown et mettre le bouton sélectionné en haut
    function toggleDropdownMenu() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.classList.toggle('show');
      
        const sortButtons = dropdownMenu.querySelectorAll('.sort-button');
        const selectedButton = dropdownMenu.querySelector('.sort-button.selected');
        dropdownMenu.prepend(selectedButton);

        const separateButtons = dropdownMenu.querySelectorAll('.separate-button');
        separateButtons.forEach((separateButton) => {
            separateButton.remove();
        });
      
        const firstButtons = Array.from(sortButtons).slice(0, 2);
        firstButtons.forEach((button) => {
            const separator = document.createElement('span');
            separator.classList.add('separate-button');
            button.insertAdjacentElement('afterend', separator);
        });
    }

    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.appendChild(popularityButton);
    dropdownMenu.appendChild(titleButton);
    dropdownMenu.appendChild(dateButton);

    // Créer le container à boutons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container')
    buttonsContainer.innerText = 'Trier par : '
    buttonsContainer.appendChild(dropdownMenu);

    // Afficher les boutons de tri avant les médias
    mediasContainer.parentNode.insertBefore(buttonsContainer, mediasContainer);
    toggleButtonState('sort-button-popularity');

    // Ajouter les événements des médias
    resetEventListener();

    // LIKES
    let mediasLiked = [];
    function incrementLikes(id) {
        const parseId = parseInt(id)
        const likeBtn = document.getElementById(`like-${id}`);
        const mediaTotalLikes = document.getElementById('total-likes');
        const media = mediaData.find(media => media.id === parseId);
        let totalLikes = parseInt(mediaTotalLikes.innerText);

        const mediaIndex = mediasLiked.indexOf(parseId);

        // Ajouter l'id au tableau sinon le retirer
        if (mediaIndex === -1) {
            mediasLiked.push(parseId);
            media.likes += 1;
            likeBtn.classList.add('dislike');
            likeBtn.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;
            likeBtn.setAttribute('aria-label', 'Retirer votre like de l\'image');
            mediaTotalLikes.innerText = totalLikes += 1;
        } else {
            mediasLiked.splice(mediaIndex, 1);
            media.likes -= 1;
            likeBtn.classList.remove('dislike');
            likeBtn.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
            likeBtn.setAttribute('aria-label', 'Ajouter un like à l\'image');
            mediaTotalLikes.innerText = totalLikes -= 1;
        }
    }
}

// FOOTER
async function displayFooter() {
    const photograph = await getPhotographDetails();
    const photographPrice = photograph.price;
    const mediaNbLikes = await getMediaLikes();

    const photographFooter = document.querySelector('.footer');

    const footerModel = photographFooterFactory(photographPrice, mediaNbLikes)
    const photographFooterDOM = footerModel.getPhotographFooterDOM();

    photographFooter.appendChild(photographFooterDOM);
}

// ON INIT
async function init() {
    const { photograph } = await getPhotographDetails();
    const { media } = await getMediaDetails();
    displayPhotographDetails(photograph);
    displayPhotographMedias(media);
    displayFooter(photograph, media);
};

init();