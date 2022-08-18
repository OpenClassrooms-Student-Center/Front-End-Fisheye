
async function getUrlParameter(parameter) {
    const fullurl = window.location.href;
    console.log(fullurl);
}

async function getOnePhotographer(id) {
    const url = './data/photographers.json'; // Data source .JSON 
    photographers = await fetchJSON(url, 'photographers'); // use fetchJSON function from utils/fetch.js
    return { photographers } // Return data of PhotoGraphers
}


async function init() {
    const test = await getUrlParameter("id");
    // try {
    //     // GET URL ID 
    //     const test = await getUrlParameter("id");
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    //     console.log("Page initialiser avec succès depuis init()");
    // }
    // catch (e) {
    //     console.error(e);
    //     console.log("Rediriger vers la page 404");
    // }
}


init();
