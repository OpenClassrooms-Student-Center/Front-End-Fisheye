async function getData() { 

    const response = await fetch ("/data/photographers.json") 
    return await response.json()
}
  
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {

        const userCardDOM = new UserCardFactory().createFromPhotographer(photographer)
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
        const { photographers } = await getData(); // déstructuration avec les accolades, pour récup uniquement photographers
        displayData(photographers);
     }

 init();

class UserCardFactory {

    createFromPhotographer(photographerData) {

        const {name, id, city, country, tagline, price, portrait} = photographerData
        return new UserCard(name, id, city, country, tagline, price, portrait).create()
    }
}


/*
class MediaFactory {

constructor(data, type) {
    if (type === 'photo') {
        return new MediaPhoto(data)
    } else if (type === 'video') {
        return new MediaVideo(data)
    } else {
        throw 'Unknown type format'
    }
}
au lieu d'appeler la classe directement, j'appelle MediaFactory */

/* class media globale path ou source et  2 sous classes mediavideo avec attribut video et mediaimage 
    attribut src qui change en fonction de l'attribut image ou video 
    pour le dom, factory avec 2 methodes preview : soit image , soit video 

    
*/

