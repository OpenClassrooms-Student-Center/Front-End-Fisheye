async function getPhotographer() {
    const parameters = new URLSearchParams(window.location.search)
    const idString = parameters.get('id')

    // get photographers data with fetch
    const photographerData = await fetch('../data/photographers.json')
        .then((data) => data.json());

    // extract photographer object
    const photographer = photographerData.photographers.find(
        (photographer) => photographer.id == idString
    )
    return photographer
}

async function getPhotographerMedias() {
    const parameters = new URLSearchParams(window.location.search)
    const idString = parameters.get('id')
  
    // get photographers data with fetch
    const photographerData = await fetch('../data/photographers.json')
      .then((data) => data.json())
  
    // extract media objects for photographer
    const media = photographerData.media.filter(
      (mediaObj) => mediaObj.photographerId == idString
    )
    return media
  }

async function displayHeader(photographer) {
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    photographerHeader.appendChild(photographerHeaderDOM);
};

// price per day photographer
async function displayCounts(photographer) {
    const main = document.querySelector('main');
    const countDOM = document.createElement('div');
    countDOM.classList.add('counter');

    // Get all divs with the class .photograph-media-likes-count
    const likesList = document.querySelectorAll('.photograph-media-likes-count');

    let totalLikes = 0;
    // Iterate through each div and add up the total likes
    likesList.forEach(likesDiv => {
        const likes = parseInt(likesDiv.textContent);
        totalLikes += likes;
    });

    countDOM.innerHTML = 
    `<div class="counter-likes">
        ${totalLikes} <i class="fas fa-heart"></i>
    </div>
    <div class="counter-daily">
        ${photographer.price} <span>€ /jour</span>
    </div>`;

    main.appendChild(countDOM);
};


async function displayMedia(media) {
    const mediaContainer = document.querySelector('.photograph-body');

    if (mediaContainer) {
        media.forEach((mediaObj) => {
            const mediaModel = mediaFactory(mediaObj);
            const mediaDOM = mediaModel.getMediaDOM();
            mediaContainer.appendChild(mediaDOM);
        });
    }
};

async function init() {
    // get photographers infos
    const photographer = await getPhotographer();
    displayHeader(photographer);
  
    // get photographers media
    const photographerMedias = await getPhotographerMedias();
    displayMedia(photographerMedias);

    // display photographer's price
    displayCounts(photographer);

    // Add photographer's name to contact form title
    const contactModalTitle = document.querySelector('#contact_modal_title');
    contactModalTitle.innerHTML = `Contactez-moi ${photographer.name}`;
}
  
init();

  


  

