async function displayData(photographers, querySelector, id) {
 
    photographers.forEach((photographer) => {
        if (id) {
            if (photographer.id == id) {
                // Then we are going use the PhotographerFactory to generate DOM
                console.log(photographer);
                const photographerModel = photographerFactory(photographer);
                const PhotographerHeader = photographerModel.setPhotographerHeader();
                // End of PhotographerFactory Work
            }
        } else {
            // Then we are going use the PhotographerFactory to generate DOM
            const photographersSection = document.querySelector(querySelector);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            // End of PhotographerFactory Work
        }
    });
}

async function getPhotographers() {
    const url = "./data/photographers.json"; // Data source .JSON
    photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js
    return { photographers }; // Return data of PhotoGraphers
}
