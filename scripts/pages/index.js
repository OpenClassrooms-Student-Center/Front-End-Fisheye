async function getPhotographers() {
    return fetch("../data/photographers.json")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            alert("Erreur : " + err);
        });
}

async function displayData(photographers) {
    const photographersSection = document.querySelector("#photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        // console.warn(userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    // const { photographers } = await getPhotographers();

    const responsePhotographers = await getPhotographers();
    displayData(responsePhotographers.photographers);
};

init();
