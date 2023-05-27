    async function getPhotographers() {
        // "fetch" request get info from photographers.JSON
        const response = await fetch ("./data/photographers.json");
        const results = await response.json();
        console.log(results);
        // return the photographer table once the information received
        return results;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // get the photographer data
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
    
