let photographers = []; 
    
    const getPhotographers = async () => {
        // Penser à remplacer par les données récupérées dans le json
        await fetch('./data/photographers.json')
        .then((res) => res.json())
        .then((dataPhotographers) => { 
            return photographers = dataPhotographers.photographers;  
        })
        .catch((err )=> {
        console.log(err); 
        }); 
    }
    
    async function displayData(photographers) {
        const photographersSection = document.querySelector('.photographer_section');
        const link = document.getElementById('link'); 
        photographers.forEach((photographer) => { 
            link.href += `../photographer.html?id=${photographer.id}`; 
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.innerHTML += userCardDOM;
        });
    }

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers(photographers);
        displayData(photographers);
    }
    
    init();
    