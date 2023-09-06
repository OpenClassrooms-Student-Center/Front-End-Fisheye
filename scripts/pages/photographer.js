//Mettre le code JavaScript lié à la page photographer.html
let photographerData = null;

function displayData(photographer, media) {
  const mainElt = document.querySelector('main');

  const photographerModel = photographerTemplate(photographer, media);
  const photographerDetails = photographerModel.getPhotographerDetails();
  mainElt.appendChild(photographerDetails);
}

async function init() {
  const params =  new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  photographerData = await getPhotographerById(id);
  displayData(photographerData.photographer, photographerData.media);
  console.log(`photographerData`,  photographerData);
}

init();
