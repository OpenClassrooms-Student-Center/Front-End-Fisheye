//Get the "id" parameter in URL

const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id')
console.log(photographerId);