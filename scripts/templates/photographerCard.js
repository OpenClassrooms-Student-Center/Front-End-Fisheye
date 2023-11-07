function photographerCard(photographer) {
  const { name, portrait, city, country, tagline, price, id } = photographer;
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
  function getPhotographerCard() {
    // article container
    const article = document.createElement('article');
    article.className = 'photographer';
    // link to profil page (img + name)
    const photographerPageLink = document.createElement('a');
    photographerPageLink.className = 'photographer__link';
    photographerPageLink.setAttribute(
      'href',
      `./pages/photographer.html?id=${id}`
    );

    // profile picture
    const profilePicture = document.createElement('img');
    profilePicture.className = 'photographer__profile-picture';
    profilePicture.src = picture;
    profilePicture.alt = `Profil de ${name}`;
    // photographer name
    const photographerName = document.createElement('h2');
    photographerName.className = 'photographer__name';
    photographerName.textContent = name;

    photographerPageLink.appendChild(profilePicture);
    photographerPageLink.appendChild(photographerName);
    // description container (location, tagline, price)
    const photographerDescription = document.createElement('div');
    // location
    const photographerLocation = document.createElement('p');
    photographerLocation.className = 'photographer__location';
    photographerLocation.textContent = `${city}, ${country}`;
    // tagline
    const photographerTagline = document.createElement('p');
    photographerTagline.className = 'photographer__tagline';
    photographerTagline.textContent = tagline;
    // price
    const photographerPrice = document.createElement('p');
    photographerPrice.className = 'photographer__price';
    photographerPrice.textContent = `${price}€/jour`;

    photographerDescription.appendChild(photographerLocation);
    photographerDescription.appendChild(photographerTagline);
    photographerDescription.appendChild(photographerPrice);
    // add all childs to article
    article.appendChild(photographerPageLink);
    article.appendChild(photographerDescription);

    article.dataset.id = id;
    return article;
  }
  return { getPhotographerCard };
}

export { photographerCard };
