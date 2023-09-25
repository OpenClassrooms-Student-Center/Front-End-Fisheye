//Mettre le code JavaScript lié à la page photographer.html

async function getDataPhotographers() {

    let dataPhotographers = await fetch("../../data/photographers.json");
    return dataPhotographers.json();
}

async function displayInfo(photographers) {
    const photographersInfo = document.querySelector(".photograph-info");
    const { id } = data;

    photographers.forEach((id) => {
        const photographerModel = photographInfoTemplate(id);
        const userInfoDOM = photographerModel.getUserInfoDOM();
        photographersInfo.appendChild(userInfoDOM);

        //Pareil pour la photo puis le prix
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getDataPhotographers();
    displayInfo(photographers);
}

init();