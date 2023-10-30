// Fonction asynchrone pour récupérer les données depuis un fichier JSON
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }