async function displayData(photographers, querySelector, id) {

    function usePhotographerFactory(photographer) {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }

    const photographersSection = document.querySelector(querySelector);
    photographers.forEach((photographer) => {
        if (id) {
            if (photographer.id == id) {
                // Then we are going use the PhotographerFactory to generate DOM
                usePhotographerFactory(photographer);
                // End of PhotographerFactory Work
            }
        }
        else {
            // Then we are going use the PhotographerFactory to generate DOM
            usePhotographerFactory(photographer);
            // End of PhotographerFactory Work
        }
    });
};

async function getPhotographers() {
    const url = './data/photographers.json'; // Data source .JSON 
    photographers = await fetchJSON(url, 'photographers'); // use fetchJSON function from utils/fetch.js
    return { photographers } // Return data of PhotoGraphers
}


