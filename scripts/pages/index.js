// Shared function used by index.JS (home page) & photographer.js
// (photographer detail) are inside sharedFunction.JS

async function init() {
    // Try to get data from photographes if error then redirect to 404 page
    try {
        const { photographers } = await getPhotographers(); // Function inside sharedFunction.js
        displayData(photographers, ".photographer_section"); // Function inside sharedFunction.js
        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
