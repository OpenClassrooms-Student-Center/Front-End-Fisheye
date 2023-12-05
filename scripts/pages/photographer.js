//Mettre le code JavaScript lié à la page photographer.html

async function getMedia() {

       
const reponse = await fetch('data/photographers.json');
const data=await reponse.json();

        return (data);
    }

    async function displayData(medias) {
        const mediasSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
//Fonction asynchrone pour attendre l'exécution de getPhotographers
    async function init() {

        //APRES AVOIR ATTENDU L EXECUTION DE LA FONCTION ASYNCHRONE!!!!!

        // Récupère les datas des photographes 
        const { media } = await getMedia();
        //recupération des datas (photographes+media)
   

       
        

        displayData(photographers);


     

    }


    init();
