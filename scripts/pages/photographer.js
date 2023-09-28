//Mettre le code JavaScript lié à la page photographer.html

async function getDataPhotographers() {

    const dataPhotographers = await fetch("../../data/photographers.json");
    return dataPhotographers.json();
}

async function displayInfo(photographer) {
    const photographerInfo = document.querySelector(".photograph-info");

    const photographerModel = photographerInfoTemplate(photographer);
    const userCardInfoDOM = photographerModel.getUserInfoDOM();
    console.log(userCardInfoDOM);
    photographerInfo.appendChild(userCardInfoDOM);

}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getDataPhotographers();

    const param = new URLSearchParams(document.location.search);
    const id = param.get("id")
    let photographer;

    if (!id) {
        console.error("missing id parameter");
        return
    }

    for (let i = 0; i < photographers.length; i++) {
        if (photographers[i].id == id) {
            photographer = photographers[i]
        }
    }
}

init();