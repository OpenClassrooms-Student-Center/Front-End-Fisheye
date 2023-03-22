    async function getPhotographers() {

        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        const photographers = data.photographers;
        
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers;
    }

    async function displayData() {
        const photographers = await getPhotographers();
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        await displayData();
    };
    
    init();

    
