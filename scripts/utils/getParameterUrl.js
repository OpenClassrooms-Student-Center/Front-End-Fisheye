
// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"), 10);
  }
  