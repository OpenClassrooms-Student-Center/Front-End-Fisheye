async function getPhotographers() {
    // get data with fetch
    const photographer = await fetch('../data/photographers.json')
        .then((data) => data.json());
    return photographer;
}
  
function getPhotographerId() {
    const parameters = new URLSearchParams(window.location.search);
    const idString = parameters.get('id');

    // return a number
    return parseInt(idString);
}
 
// get photographer medias with "photographerId" & getPhotographerId()
async function getPhotographerMedia() {
    const photographer = await getPhotographers();
    const photographerId = getPhotographerId();

    // filtering media items & comparing them with photographer IDs
    const media = photographer.media
        .filter(item => item.photographerId === photographerId);

    return media;
}
  
  