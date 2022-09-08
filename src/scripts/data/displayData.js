import { photographerFactory } from "../factories/photographerFactory";


export async function displayData(photographers, id) {
    let photographerSelected = "";
    
    photographers.forEach((photographer) => {

        if (photographer.id == id) {
            // Then we are going use the PhotographerFactory to set DOM
            if (process.env.NODE_ENV === 'development') { console.log(photographer); }
            const photographerModel = photographerFactory(photographer);
            photographerModel.setPhotographerHeader();
            photographerModel.setStickyBarPrice();

            photographerSelected = photographer
            // End of PhotographerFactory Work
        }
       
    });

    return (photographerSelected); // Return the photographerShow at the end

}

export async function displayDataAll(photographers, querySelector) {

    photographers.forEach((photographer) => {

        // Then we are going use the PhotographerFactory to generate DOM
        const photographersSection = document.querySelector(querySelector);
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        if (process.env.NODE_ENV === 'development') { console.log(photographer); }
        if (userCardDOM) {
            photographersSection.appendChild(userCardDOM);
        }
        // End of PhotographerFactory Work

    });


}

