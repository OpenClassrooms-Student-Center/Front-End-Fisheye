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
    const cityP = document.createElement('p');
    cityP.textContent = city ?? 'ville inconue';
    const countryP = document.createElement('p');
    countryP.textContent = country ?? 'pays inconnu';
    const quote = document.createElement('p');
    quote.textContent = tagline ?? '';
    const priceP = document.createElement('p');
    priceP.textContent = price ? `${price}€ par jour` : 'prix non spécifié';
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(quote);
    article.appendChild(priceP);
    article.appendChild(cityP);
    article.appendChild(countryP);

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
