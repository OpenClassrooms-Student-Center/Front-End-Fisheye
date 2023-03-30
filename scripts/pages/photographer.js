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
}
  
init();
  


  

