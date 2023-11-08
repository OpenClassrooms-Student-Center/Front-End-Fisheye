/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// Fonction pour récupérer le paramètre depuis l'URL
function getParameterFromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get(parameter), 10);
}

// Fonction asynchrone pour récupérer les données depuis un fichier JSON
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
