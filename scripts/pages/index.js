    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers = fetch('./data/photographers.json')
        .then(response => response.json())
        .then(photographers => {return photographers})
        .catch(err => {
        console.log('Error : ' + err); 
        });
        return photographers;  
    }

    

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        const linkUser = document.getElementById('urlUser');
        photographers.forEach((photographer) => { 
            let params = new URLSearchParams({
                id : photographers.id,
                name : photographers.name
            }) 
            const url = `${params}`; 
            linkUser.href =  url; 
            console.log(linkUser);
            const photographerModel = photographerFactory(photographer);
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
    