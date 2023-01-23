    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        const priceBasis = '€/jour';

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer, priceBasis);
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
