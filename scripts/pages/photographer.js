async function getPhotographer() {
    const parameters = new URLSearchParams(window.location.search);
    const idString = parameters.get('id');
    
    // get data with fetch
    const photographer = await fetch('../data/photographers.json')
        .then((data) => data.json())
        .then(data => data.photographers.filter(photographer => photographer.id == idString))

    return photographer;
}

async function displayHeader(photographer) {
    // console.log(photographer)
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    photographerHeader.appendChild(photographerHeaderDOM);  
    
    console.log(photographerModel)
};

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    displayHeader(photographer);
};

init();
