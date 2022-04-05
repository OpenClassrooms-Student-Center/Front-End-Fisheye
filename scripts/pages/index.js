//lit le fichier json pour en récupérer les données des photographes
async function getPhotographers() {
    const response = await  fetch("./data/photographers.json");
    const data = await response.json();

    console.log(data)
    return {
        photographers: data.photographers // could be: return ({ photographers: [...data.photographers] })
    };
}

    // Affiche la carte des photographes dans la page index
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);

            console.log(photographer)
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM); //replace appendChild(userCardDOM) by 
            //photographersSection.insertAdjacentHTML("beforeend", userCardDOM)
            
            console.log(userCardDOM)
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    