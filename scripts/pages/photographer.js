    // fetching information from json file and transforming json objects into jsobjects using json()
    async function photographerPage(){
        const photographerResponse = await fetch ("./data/photographers.json");
        const photographerResults = await photographerResponse.json();
        console.log(photographerResults);
        return photographerResults;
    }

    // displaying the information in photographer page
    async function displayPhotographer(photographers){
        // creating elements in the main section for each photographer
        const photographerHeaderZone = document.querySelector('.photograph-header');

        let params = (new URL(document.location)).searchParams;
        let id = params.get('id');
        console.log(id);
        console.log(photographers);

        let photographer = photographers.find(myId => myId.id == id);
        console.log(id);
        console.log(photographer);
  
        const photographerSection = photographerFactory(photographer);
        const infoPhotographer = photographerSection.getUserCardDOM();
        photographerHeaderZone.appendChild(infoPhotographer);
        
    };

    async function initPhotographerPage() {
        // get the photographer data in the photographer page
        const { photographers } = await photographerPage();
        displayPhotographer(photographers);
    };
    
    initPhotographerPage();