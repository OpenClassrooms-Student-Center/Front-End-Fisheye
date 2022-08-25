
import { photographerFactory } from "../factories/photographerFactory";

export async function displayData(photographers, querySelector, id) {

    photographers.forEach((photographer) => {
        if (id) {
            if (photographer.id == id) {
                // Then we are going use the PhotographerFactory to set DOM
                console.log(photographer);
                const photographerModel = photographerFactory(photographer);
                photographerModel.setPhotographerHeader();
                photographerModel.setStickyBarPrice();
                // End of PhotographerFactory Work
            }
        } else {
            // Then we are going use the PhotographerFactory to generate DOM
            const photographersSection = document.querySelector(querySelector);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            // End of PhotographerFactory Work
        }
    });
}

