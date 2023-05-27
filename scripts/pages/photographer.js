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


    // geting parameters from the url to get the targeted id for each photographer
    // let params = new URL(document.location).searchParams;
    // let pageId = params.get("id");



    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photograph-header");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // get the photographer data
    //     const { photographers } = await photographerPage();
    //     displayData(photographers);
    // };
    
    // init();
    
    
   // async function test() {
    // fetch("./data/photographers.json")
    //     .then(function(resp){
    //         return resp.json();
    //     })
    //     .then(function(data){
    //         console.log(data);
    //         return data;
    //     });
    // };