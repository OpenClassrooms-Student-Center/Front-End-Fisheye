    async function getPhotographers() {
        let liste = [];
        try {
            let response = await fetch("../data/photographers.json");
            let data = await response.json();
            liste = data.photographers;
        } catch (error) {
            console.error(error);
        }
        
        return ({liste})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const {liste}  = await getPhotographers();
        displayData(liste);
    }
    
    init();
    
