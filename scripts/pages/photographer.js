//Mettre le code JavaScript lié à la page photographer.html
/**
 * Display photographer data on photographer page
 * @async 
 * @function displayPhotographerData
 * 
 */
 async function displayPhotographerData() {
    const { media, photographers } = await getData()
    const id = window.location.search.split('id=')[1];
    const selectedPhotographerData =  photographers.find(photographer => photographer.id == id);
    const $photographerHeader = document.querySelector('.photographer-page__header');
    $photographerHeader.innerHTML += new Photographer(selectedPhotographerData).userHeader
    const mediaGallery = media.filter(media => media.photographerId == id)
    const $elementGalery = document.querySelector('.photographer-page__gallery')
    mediaGallery.forEach(media => {
        let medias = new MediaFactory(media)
        $elementGalery.innerHTML += medias.createHtml()
    } );
}

const main = async () => {
    await displayPhotographerData()
    Lightbox.init();
} 

main()