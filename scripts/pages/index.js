// fonction pour recuperer les données du json

// fetch('./data/photographers.json')
//    .then(function (response) {
//        return response.json()
//    } ).then(function (data) {
//         console.log(data);
//    })
// let artist = [];
// let medias = [];


// const getArtists = async function() {
//     let response = await fetch('./data/photographers.json')
//     let data = await response.json()
//     console.log(data);
//     console.log(data.media);
//     console.log(data.photographers[0].name);
// }
// getArtists()

async function getPhotographers() 
            
        {
        // Penser à remplacer par les données récupérées dans le json
            let response = await fetch('./data/photographers.json')
            let data = await response.json()
            
            console.log(data);
            console.log(data.media);
            console.log(data.photographers[0].name);

            return  data
        }
        // et bien retourner le tableau photographers seulement une fois
       
    

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
    
