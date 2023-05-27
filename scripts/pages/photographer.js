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
        // getting the search params
        let params = (new URL(document.location)).searchParams;
        // getting the id from the search params
        let id = params.get('id');
        console.log(id);
        console.log(photographers);
        // getting the corosponding object (photographer) related to the id from the search params
        let photographer = photographers.find(myId => myId.id == id);
        console.log(id);
        console.log(photographer);

        // displaying the photographer information
        const photographerSection = photographerFactory(photographer);
        const infoPhotographer = photographerSection.getUserCardDOM();
        photographerHeaderZone.appendChild(infoPhotographer);
        
        // creating a contact me  button
        const btnNewPosition = document.querySelector('.mainArticle');
        const btn = document.createElement('button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role' , 'button');
        btn.setAttribute("class" , 'contact_button'); 
        btn.textContent = 'Contactez-moi' ;
        btnNewPosition.appendChild(btn);

        // adjusting the elements as required in the maquette
        const flexOrdering = document.querySelector('.frame');
        flexOrdering.style.order = 3;
        flexOrdering.setAttribute('tabIndex', '6');
    };

    async function initPhotographerPage() {
        // get the photographer data in the photographer page
        const { photographers } = await photographerPage();
        displayPhotographer(photographers);
    };
    
    // calling the function to create the elements in photographer page
    initPhotographerPage();

    