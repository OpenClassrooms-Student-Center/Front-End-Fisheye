// Shared function used by index.JS (home page) & photographer.js
// (photographer detail) are inside sharedFunction.JS

async function getUrlParameter(parameter) {
    const fullUrl = window.location.href; // Get full url
    const url = new URL(fullUrl); // Create URL Object
    const parameterValue = url.searchParams.get(parameter); // get parameter value
    return parameterValue;
}

async function init() {
    try {
        const idValue = await getUrlParameter("id");
        const { photographers } = await getPhotographers(); // Function inside sharedFunction.js

        displayData(photographers, ".photograph-header", idValue); // Function inside sharedFunction.js
        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
