// Array that will contain the result of the fetch
    let InfosPhotographers = []
    
    // Function to fetch and return data
    async function getPhotographers() {
       // We fetch our json file with a GET method
        await fetch(`../data/photographers.json`, {
        method: 'GET'
       })
       .then(response => {
        return response.json();
      }).then(photographers => {
        // We retrieve our datas and insert them into our array infosPhotographers
       for(let i= 0; i < photographers.photographers.length; i++){
        InfosPhotographers.push(photographers.photographers[i])     
       }       
      }).catch(err => {
        console.log(err + "error")
      });
        
        // We return our array 
        return ({
            photographers: InfosPhotographers})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
          /* eslint-disable */
            const photographerModel = photographerFactory(photographer);
            const mediaCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(mediaCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
