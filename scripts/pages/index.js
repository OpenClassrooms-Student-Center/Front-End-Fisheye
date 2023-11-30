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
        return ('toto');
    }

    async function displayData(photographers) {
        // const photographersSection = document.querySelector(".photographer_section");

        // photographers.forEach((photographer) => {
        //     const photographerModel = photographerTemplate(photographer);
        //     const userCardDOM = photographerModel.getUserCardDOM();
        //     photographersSection.appendChild(userCardDOM);
        // });
    }

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
        

    //     displayData(photographers);

    // }
    let a=getPhotographers();
    console.log('coucou'+ a);
    // init();


