async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
        return fetch("data/photographers.json")
            .then(response => {
        // et bien retourner le tableau photographers seulement une fois
            return response.json();
          })
            .then(data => {const photographers = data.photographers;
            return ({photographers})
            });
        }
        console.log(getPhotographers());

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

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
    