async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const request = './data/photographers.json';
    const photographers = await fetch(request)
                                .then(response => {
                                    if(response.ok) {
                                        return response.json();
                                    }
                                })
                                // .then(json => {
                                //     this.photographers = json.photographers;
                                //     console.log(this.photographers);
                                // })
                                .catch(error => {
                                    // 
                                });

    // et bien retourner le tableau photographers seulement une fois
    return ( /*{ photographers: [...photographers] }*/ photographers );
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM.firstChild);
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
    