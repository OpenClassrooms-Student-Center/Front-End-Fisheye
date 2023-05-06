async function getPhotographer() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const { photographers } = data;
  const urlParams = new URL(document.location).searchParams;
  const id = parseInt(urlParams.get('id'), 10);
  return photographers.find((photographer) => photographer.id === id);
}

async function displayHeaderData(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  const photographerModel = photographerFactory(photographer);
  const { infos, avatar } = photographerModel.getPhotographerHeaderElements();

  avatar.setAttribute('class', 'avatar');

  photographerHeader.prepend(infos);
  photographerHeader.appendChild(avatar);
}

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

async function init() {
  const photographer = await getPhotographer();
  displayHeaderData(photographer);
  displayMedias(photographer);
  displayTotalLikesAndPrice(photographer);
}

init();
