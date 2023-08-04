    async function getPhotographers() {
        
        let response = await fetch("../data/photographers.json")
        let data = await response.json();
        let photographers = data.photographers; 
        console.log(photographers);   
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers;
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
        const  photographers  = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
