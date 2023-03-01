    async function getPhotographers() {
        // get datas with fetch
        const photographer = await fetch('../data/photographers.json')
            // promise => response
            .then((data) => data.json())
        // return promise
        return photographer
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector('.photographer_section');

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
