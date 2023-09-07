    async function getPhotographers() {
        try {
            const data = await fetch('../../data/photographers.json')
                .then(response => {
                    if(!response.ok) throw new Error('Un problème est survenu lors de la récupération des données');

                    return response.json();
                });
            
               
                return ({ photographers: [ ...data.photographers ]});

        } catch (error) {
            console.error(error)
        }
    }

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
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
