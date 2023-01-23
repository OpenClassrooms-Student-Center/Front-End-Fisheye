async function displayPhotographerInformation(photographer) {

    const photographerModel = photographerFactory(photographer);

    const { photographerPresentationElement, photographerPictureElement } = photographerModel.getUserCardDOM(true)

    const photographerHeader = document.querySelector('.photograph-header')

    const contactButton = document.querySelector('.contact_button')

    photographerHeader.append(photographerPresentationElement, contactButton, photographerPictureElement)
    // getPhotographerProfileDom(photographer)
    // getPhotographerMediaDom(media)

}

async function init() {
    // Récupère les datas des photographes
    const { photographer, photographerMedias } = await getPhotographerData();
    displayPhotographerInformation(photographer);
};

init();
