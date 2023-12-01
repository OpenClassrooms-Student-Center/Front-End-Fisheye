    async function getPhotographers() {
      //importation des donnes json
       
   const reponse = await fetch('data/photographers.json');
   const data=await reponse.json();
       
        console.log(data.photographers);
        console.log(data.media);
        // photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"
        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     },
        // ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return (data);
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

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
        const { photographer } = await getPhotographers();
        //recupération des datas (photographes+media)
        let alo = await getPhotographers();

       
        

        // displayData(photographers);


     
        //récupérer les data des médias
        console.log('coucou'+ alo.media[1].id);

        // récupération des data de photographers
        console.log('coucou'+ photographer);
    }


    init();


