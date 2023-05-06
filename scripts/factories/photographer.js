function photographerFactory(photographer) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = photographer;

  // Recurring elements
  const avatarSrc = `assets/images/photographers/${portrait}`;
  const avatar = document.createElement('img');
  avatar.setAttribute('src', avatarSrc);
  avatar.setAttribute('alt', name);

  const locationTag = document.createElement('span');
  locationTag.setAttribute('class', 'location');
  locationTag.textContent = `${city}, ${country}`;

  const taglineTag = document.createElement('span');
  taglineTag.setAttribute('class', 'tagline');
  taglineTag.textContent = tagline;

  const priceTag = document.createElement('span');
  priceTag.textContent = `${price}€/jour`;
  priceTag.setAttribute('class', 'price');

  function getPhotographerCard() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    const h2 = document.createElement('h2');

    link.setAttribute('href', `photographer.html?id=${id}`);
    h2.textContent = name;

    link.appendChild(avatar);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(locationTag);
    article.appendChild(taglineTag);
    article.appendChild(priceTag);

    return article;
  }

  function getPhotographerHeaderElements() {
    const infos = document.createElement('div');
    const h1 = document.createElement('h1');

    infos.setAttribute('class', 'photographer-infos');
    h1.setAttribute('class', 'photographer-heading');
    h1.textContent = name;

    infos.appendChild(h1);
    infos.appendChild(locationTag);
    infos.appendChild(taglineTag);

    const photographerHeaderElements = { infos, avatar };

    return photographerHeaderElements;
  }

  async function getMedias() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const medias = data.media;
    const filteredMedias = medias.filter((media) => media.photographerId === id);
    return filteredMedias;
  }

  async function getTotalLikes() {
    const medias = await getMedias();
    return medias.reduce((acc, media) => acc + media.likes, 0);
  }

  return {
    name,
    getPhotographerCard,
    getPhotographerHeaderElements,
    getMedias,
    getTotalLikes,
  };
}
