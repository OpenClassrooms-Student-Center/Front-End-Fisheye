//Mettre le code JavaScript lié à la page photographer.html

function displayData(photographer, medias) {
  const mainElt = document.querySelector('main');

  const photographerModel = photographerTemplate(photographer, medias);
  const photographerDetails = photographerModel.getPhotographerDetails();
  
  const mediasContainer = document.createElement('section');
  mediasContainer.classList.add('photograph_medias');
  
  medias.forEach((media, index, list) => {
    const mediaModel = mediaTemplate(media, photographer, list);
    const mediaDOM = mediaModel.mediaDOM();
    mediasContainer.appendChild(mediaDOM);
  });
  
  mainElt.appendChild(photographerDetails);
  mainElt.appendChild(mediasContainer);

}

async function init() {
  const params =  new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  const photographerData = await getPhotographerById(id);
  displayData(photographerData.photographer, photographerData.media);
}

init();
