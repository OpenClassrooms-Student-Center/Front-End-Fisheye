let photographers;

    async function getPhotographers() {

        await fetch('data/photographers.json')
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            .then(function(data) {
                // On ajouter les données de l'API dans le tableau photographers
                // console.log(data);
                photographers = data.photographers;
                // photographers.push(value);
            })
            .catch(function(err) {
                // Une erreur est survenue
                console.log("error in the function getPhotographers()"); 
            });
    };

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = PhotographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers();
        displayData(photographers);
    };
    
    init();
    