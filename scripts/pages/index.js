async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer-section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.innerHTML += userCardDOM;
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await fetchPhotographers();
        displayData(photographers);
    }
    
    init();