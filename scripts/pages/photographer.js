// Get the photographer's id from the url and return the photographer
async function getPhotographer() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const { photographers } = data;
  const urlParams = new URL(document.location).searchParams;
  const id = parseInt(urlParams.get('id'), 10);
  return photographers.find((photographer) => photographer.id === id);
}

// Get the photographer's header data from model and display it
async function displayHeaderData(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  const photographerModel = photographerFactory(photographer);
  const { infos, avatar } = photographerModel.getPhotographerHeaderElements();

  avatar.setAttribute('class', 'avatar');

  photographerHeader.prepend(infos);
  photographerHeader.appendChild(avatar);
}

// Get the photographer's medias from model and display them
async function displayMedias(photographer) {
  const main = document.querySelector('#main');

  const mediasSection = document.createElement('section');
  mediasSection.setAttribute('class', 'medias');

  const photographerModel = photographerFactory(photographer);
  const medias = await photographerModel.getMedias();

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasSection.appendChild(mediaCard);
  });

  main.appendChild(mediasSection);
}

// Get the photographer's total likes and price from model and display them
async function displayTotalLikesAndPrice(photographer) {
  const totalLikesAndPriceTag = document.querySelector('.total-likes');

  const totalLikesTag = document.createElement('span');
  const priceTag = document.createElement('span');

  totalLikesTag.setAttribute('class', 'total-likes__likes');

  const photographerModel = photographerFactory(photographer);
  const totalLikes = await photographerModel.getTotalLikes();

  totalLikesTag.textContent = `${totalLikes} ♥`;
  priceTag.textContent = `${photographer.price}€/jour`;
  totalLikesAndPriceTag.appendChild(totalLikesTag);
  totalLikesAndPriceTag.appendChild(priceTag);
}

// Display the photographer's page
async function init() {
  const photographer = await getPhotographer();
  displayHeaderData(photographer);
  displayMedias(photographer);
  displayTotalLikesAndPrice(photographer);
}

init();
