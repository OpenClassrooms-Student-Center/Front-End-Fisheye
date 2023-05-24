// GET ID BY PARAMS
const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');

// HEADER
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
};

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

    // Tri par popularité ou titre ou date
    function sortByPopularity() {
        mediasContainer.innerHTML = '';

        const mediaFactory = createMediaFactory(mediaData, 'popularity');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        mediaDOM.forEach((mediaElement) => {
            mediasContainer.appendChild(mediaElement);
        });

        toggleButtonState('sort-button-popularity');
    }

    function sortByTitle() {
        mediasContainer.innerHTML = '';

        const mediaFactory = createMediaFactory(mediaData, 'title');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        mediaDOM.forEach((mediaElement) => {
            mediasContainer.appendChild(mediaElement);
        });

        toggleButtonState('sort-button-title');
    }

    function sortByDate() {
        mediasContainer.innerHTML = '';

        const mediaFactory = createMediaFactory(mediaData, 'date');
        const mediaDOM = Array.from(mediaFactory.getMediaDOM());

        mediaDOM.forEach((mediaElement) => {
            mediasContainer.appendChild(mediaElement);
        });

        toggleButtonState('sort-button-date');
    }

    // Créer les boutons et les afficher
    function toggleButtonState(buttonClass) {
        const sortButtons = document.querySelectorAll('.sort-button');
        sortButtons.forEach((button) => {
            if (button.classList.contains(buttonClass)) {
                button.classList.add('selected');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('selected');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    function createSortButton(text, buttonClass, sortByFunction) {
        const button = document.createElement('button');
        button.classList.add('sort-button', buttonClass);
        button.textContent = text;
        button.addEventListener('click', () => {
          sortByFunction();
          toggleDropdownMenu();
        });

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-chevron-down');
        button.appendChild(icon);
      
        return button;
      }

    const popularityButton = createSortButton('Popularité', 'sort-button-popularity', sortByPopularity);
    const titleButton = createSortButton('Titre', 'sort-button-title', sortByTitle);
    const dateButton = createSortButton('Date', 'sort-button-date', sortByDate);

    // Créer le menu dropdown
    function toggleDropdownMenu() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.classList.toggle('show');
      
        const sortButtons = dropdownMenu.querySelectorAll('.sort-button');
        const selectedButton = dropdownMenu.querySelector('.sort-button.selected');
      
        if (selectedButton) {
            dropdownMenu.prepend(selectedButton);
        }

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

    mediasContainer.parentNode.insertBefore(buttonsContainer, mediasContainer);
    toggleButtonState('sort-button-popularity');
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

// Mettre à jour le nombre de like et l'icône
function incrementLikes(id, likes) {
    const likeBtn = document.getElementById(`like-${id}`);
    const mediaTotalLikes = document.getElementById('total-likes');

    let mediaLikes = likes;
    let mediaLiked = mediaLikes += 1;
    let totalLikes = parseInt(mediaTotalLikes.innerText);
    
    if (!likeBtn.classList.contains('dislike')) {
        mediaLikes += 1;
        likeBtn.classList.add('dislike');
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-solid fa-heart"></i>`;
        likeBtn.ariaLabel = "Retirer votre like de l'image";
        mediaTotalLikes.innerText = totalLikes += 1;
    } else {
        mediaLiked -= 1;
        likeBtn.classList.remove('dislike');
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-regular fa-heart"></i>`;
        likeBtn.ariaLabel = "Ajouter un like à l'image";
        mediaTotalLikes.innerText = totalLikes -= 1;
    }
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