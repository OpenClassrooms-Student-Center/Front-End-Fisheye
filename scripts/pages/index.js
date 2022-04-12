    import photographerFactory from "../factories/photographer.js";
    async function getPhotographers() {
        return fetch("../data/photographers.json")
        .then(res => res.json())
    }
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log(photographers);
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers)
    };
    
    init()