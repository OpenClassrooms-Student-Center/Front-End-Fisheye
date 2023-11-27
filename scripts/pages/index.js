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
