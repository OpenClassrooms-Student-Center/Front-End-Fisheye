    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     const photographers = [
    //         {
    //             "name": "Mimi Keel",
    //             "id": 243,
    //             "city": "London",
    //             "country": "UK",
    //             "tagline": "Voir le beau dans le quotidien",
    //             "price": 400,
    //             "portrait": "MimiKeel.jpg"
    //         },
    //         {
    //             "name": "Ellie-Rose Wilkens",
    //             "id": 930,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Capturer des compositions complexes",
    //             "price": 250,
    //             "portrait": "EllieRoseWilkens.jpg"
    //         },
    //         {
    //             "name": "Tracy Galindo",
    //             "id": 82,
    //             "city": "Montreal",
    //             "country": "Canada",
    //             "tagline": "Photographe freelance",
    //             "price": 500,
    //             "portrait": "TracyGalindo.jpg"
    //         },
    //         {
    //             "name": "Nabeel Bradford",
    //             "id": 527,
    //             "city": "Mexico City",
    //             "country": "Mexico",
    //             "tagline": "Toujours aller de l'avant",
    //             "price": 350,
    //             "portrait": "NabeelBradford.jpg"
    //         },
    //         {
    //             "name": "Rhode Dubois",
    //             "id": 925,
    //             "city": "Barcelona",
    //             "country": "Spain",
    //             "tagline": "Je crée des souvenirs",
    //             "price": 275,
    //             "portrait": "RhodeDubois.jpg"
    //         },
    //         {
    //             "name": "Marcel Nikolic",
    //             "id": 195,
    //             "city": "Berlin",
    //             "country": "Germany",
    //             "tagline": "Toujours à la recherche de LA photo",
    //             "price": 300,
    //             "portrait": "MarcelNikolic.jpg"
    //         }
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers]})
    // }

    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    // };
    
    // init();
    


    class Index {
        constructor() {
          this.$photographerWrapper = document.querySelector(".photographer_section");
          this.$photographerWrapperProfile =document.querySelector(".photograph-header");
          this.photographerApi = new PhotographerApi("/data/photographers.json");
        }
      
        async main() {
            const photographersData = await this.photographerApi.getPhotographers();
            let params = new URL(document.location).searchParams;
            let idphotograph = params.get("id");
            let url = window.location.href.split("?");
        
            if (url.length > 1) {
              console.log("page photographer");
              console.log(idphotograph);
        
              photographersData.forEach((photographer) => {
                if (photographer.id == idphotograph) {
                  const TemplateProfile = new PhotographerProfile(photographer);
                  this.$photographerWrapperProfile.appendChild(TemplateProfile.createPhotographerProfile());
                } else if (photographer.id == idphotograph) {
                 
                }
              });
            } else {
              photographersData.forEach((photographer) => {
                const Template = new PhotographerCard(photographer);
                this.$photographerWrapper.appendChild(
                  Template.createPhotographerCard()
                );
        
                console.log("homepage");
              });
            }
          }
        }
      
      
      const index = new Index();
      index.main();
      