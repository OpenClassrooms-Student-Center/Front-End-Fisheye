// Importer le fichier JSON
async function fetchJsonData() {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    return data;
  }
  export {fetchJsonData};