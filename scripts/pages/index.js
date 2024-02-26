   import Photographer from "../models/Photographer.js";

   async function getPhotographers() {
        const response = await fetch ("./data/photographers.json");
        // Extraire seulement la propriété photographers de reponse
        const {photographers} = await response.json();
        return photographers;
    }

    const dataPhotographers = await getPhotographers();
    //console.log("Photographers Data:",photographersData);

    const allPhotographers = dataPhotographers.map((dataPhotographer) => new Photographer(dataPhotographer));
    
    allPhotographers.map((photographer) => photographer.createPhotograperCard());
    //console.log("AllPhotographers:",allPhotographers);

