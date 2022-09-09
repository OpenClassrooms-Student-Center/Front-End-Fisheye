/*
Code JavaScript lié à la page photographer.html
*/

/**
 * Get id in URL
 * @returns id
 */
function getId(){
    let paramsUrl = new URLSearchParams(window.location.search);
    let id = paramsUrl.get('id');
    return id;
}

/**
 * Get a photographer if he has the same id.
 * @param {*} id 
 * @returns a photographer
 */
async function getPhotographer(id) {
    let response = fetch("../../data/photographers.json")
    let data = await (await response).json()
    console.log(data.photographers);
    let photographers = data.photographers;
    let photographe;
    photographers.forEach(function(p){
        if(p.id == id){
            photographe = p;
        }
    });
    return photographe;
}

async function displayDataPhotographer(photographe) {
    const photographersSection = document.querySelector(".section-info");
    console.log(photographe);
    const photographerModel = photographerFactory(photographe);
    const userCardDOM = photographerModel.infoUserDom();
    photographersSection.appendChild(userCardDOM);
}

async function init() {
    displayDataPhotographer(await getPhotographer(getId()));
};

init();