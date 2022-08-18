async function displayData(photographers, querySelector, id) {


    const photographersSection = document.querySelector(querySelector);
    photographers.forEach((photographer) => {
        if (id) {
            if (photographer.id == id) {
                // Then we are going use the PhotographerFactory to generate DOM
                console.log(photographer);
                const photographerModel = photographerFactory(photographer);
                const PhotographerHeader = photographerModel.getPhotographerHeader();
                photographersSection.appendChild(PhotographerHeader);
                // End of PhotographerFactory Work
            }
        }
        else {
            // Then we are going use the PhotographerFactory to generate DOM
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            // End of PhotographerFactory Work
        }
    });
};

async function getPhotographers() {
    const url = './data/photographers.json'; // Data source .JSON 
    photographers = await fetchJSON(url, 'photographers'); // use fetchJSON function from utils/fetch.js
    return { photographers } // Return data of PhotoGraphers
}


