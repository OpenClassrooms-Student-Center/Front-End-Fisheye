const photographers = [];

    async function getPhotographers() {

        await fetch('data/photographers.json')
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            .then(function(value) {
                console.log(value);
                console.log(Object.entries(value));
                console.log(Object.keys(value));
                console.log(Object.values(value));
                photographers.push(Object.entries(value));

            })
            .catch(function(err) {
                // Une erreur est survenue
                console.log("error in the function getPhotographers()")
            });
            
        // return ({
        //     photographers: [...photographers]
        // });
        console.log('fin de la fn getPhotographers()')

    };

    async function displayData(photographers) {
        console.log('dans la fn displayData');
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
        console.log('après la fn displayData / forEach');
    };

    async function init() {
        console.log('dans la fn init');
        // Récupère les datas des photographes
        // const { photographers } = await getPhotographers();
        await getPhotographers();
        displayData(photographers);
        console.log('dans la fn init à la fin');

    };
    
    init();
    