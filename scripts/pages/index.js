import { ApiJson } from "../services/Api.js";

async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }; 

    async function init() {

        const fetchingURL = '../../data/photographers.json'; 

        let data
        try {
            data = await ApiJson(fetchingURL);
        } catch(err) {
            console.log(err)
        }

        const { photographers } = data
        displayData(photographers);
    };
    
    init();
