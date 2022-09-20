/**
 * Get id in URL
 * @returns id
 */
 function getId(){
    let paramsUrl = new URLSearchParams(window.location.search);
    let id = paramsUrl.get('id');
    return id;
}

/**
 * Get a photographer if he has the same id.
 * @param {*} id 
 * @returns a photographer
 */
async function getData(id) {
    //Va chercher les données
    let response = fetch("../../data/photographers.json")
    let data = await (await response).json()
    let dataReturn = [];
    //Pour les infos sur le photographe
    let photographers = data.photographers;
    let photographe;
    photographers.forEach(function(p){
        if(p.id == id){
            photographe = p;
        }
    });
    dataReturn.push(photographe);
    //Va chercher le tableau de photo
    let allPhotos = data.media;
    let photos= [];
    allPhotos.forEach(function(photo){
        if(photo.photographerId == id){
            photos.push(photo);
        }
    });
    dataReturn.push(photos);

    return dataReturn;
}

export {getData, getId};