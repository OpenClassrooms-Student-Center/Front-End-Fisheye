

async function getPhotographers() {

    const url = './data/photographers.json'; // Data source .JSON 
    photographers = await fetchJSON(url, 'photographers');
    return { photographers } // Return data of PhotoGraphers
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        console.log(photographer);
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Try to get data from photographes if error then redirect to 404 page
    try {
        const { photographers } = await getPhotographers();
        displayData(photographers);
        console.log("Page initialiser avec succès depuis init()");
    }
    catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }

};


// DOCUMENT onload wait for HTML be loaded instead of windows.load which including CSS, images
init();