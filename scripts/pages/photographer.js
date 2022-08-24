// Shared function used by index.JS (home page) & photographer.js
// (photographer detail) are inside sharedFunction.JS

async function init() {
    try {
        const idValue = await getUrlParameter("id");
        const { photographers } = await getPhotographers(); // Function inside sharedFunction.js
        displayData(photographers, ".photograph_header", idValue); // Function inside sharedFunction.js

        const { medias } = await getMedias(); // Function inside sharedFunction.js
        displayMedia(medias, ".media_section", idValue); // Function inside sharedFunction.js

        console.log("Page initialiser avec succès depuis init()");
    } catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }
}

init();
