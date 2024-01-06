function photographerTemplate(data) {
  const { name, portrait, tagline, id, city, country, price } = data;

  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Portrait de ${name}`);
    const h2 = document.createElement('h2');
    h2.textContent = name ?? 'nom inconnu';
    h2.classList.add('photographer__name');
    const cityP = document.createElement('p');
    cityP.classList.add('city');
    cityP.textContent = city ? city + ',' : 'ville inconnue';
    const countryP = document.createElement('p');
    // countryP.textContent = country ?? 'pays inconnu'; // si chaîne de caractères vide => string vide
    countryP.textContent = country || 'pays inconnu'; // => si falsy Une valeur "falsy" inclut false, 0, '' (chaîne vide), null, undefined, et NaN;
    const locationContainer = document.createElement('div');
    locationContainer.classList.add('location__container');
    const quote = document.createElement('p');
    quote.textContent = tagline ?? '';
    quote.classList.add('photographer__quote');
    const priceP = document.createElement('p');
    priceP.textContent = price ? `${price}€ par jour` : 'prix non spécifié';
    priceP.classList.add('photographer__price');
    const cardLink = document.createElement('a');
    cardLink.classList.add('photographer__link');
    cardLink.setAttribute('href', `/photographer/${id}`);
    cardLink.setAttribute('aria-label', `Voir le profil de ${name}`);
    cardLink.appendChild(img);
    cardLink.appendChild(h2);
    article.appendChild(cardLink);
    //ajout des éléments à article en tant qu'enfant
    locationContainer.appendChild(cityP);
    locationContainer.appendChild(countryP);
    article.appendChild(locationContainer);
    article.appendChild(quote);
    article.appendChild(priceP);
    return article;
  }
  return {
    name,
    picture,
    tagline,
    price,
    country,
    tagline,
    id,
    getUserCardDOM,
  };
}
