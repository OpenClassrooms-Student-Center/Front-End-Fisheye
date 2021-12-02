/*--------- DOM ELEMENTS ---------*/
let thePhotographers;
let theMedia;

let tagArray = [];
let finalTagArray = [];
/*--------- EVENTS ---------*/

/*--------- FUNCTIONS ---------*/

const fetchPhotographers = async () => {
    await fetch('./data/photographers.json')
    .then( function  (resp) {
        return resp.json();
    })
    .then( function (data) {
        thePhotographers = data.photographers;
    });
};

const photographersDisplay = async () => {
    await fetchPhotographers();

    const photographersSection = document.querySelector(".photographer_section");

    thePhotographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

    console.log(tagArray)
}

const tagsFilter = async () => {
    await fetchPhotographers();

    const tagFilters = document.querySelector(".tagFilter");
}

tagsFilter();
photographersDisplay();


    