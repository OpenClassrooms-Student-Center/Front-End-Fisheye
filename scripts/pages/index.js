// initial getPhotographers function
//    async function getPhotographers() {
//      const response = await  fetch("./data/photographers.json");
//        const data = await response.json();

//        console.log(data)
//    return {
//        photographers: data.photographers // could be: return ({ photographers: [...data.photographers] })
//    };
//}

async function getPhotographers() { 
    //Read Json to capture data
    const myJsonData=await loadJsonData();
    const photographers=myJsonData.photographers;
    return photographers;
}

async function displayData(photographers) { //affiche les photographes
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();