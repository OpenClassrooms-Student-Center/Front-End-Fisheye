function photographerFactory(data) {
  const { name, portrait, city, id, country, tagline, price, altText } = data;

  const photographerUrl = `photographer.html?id=${id}`;
  const pictureUrl = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  const formattedPrice = `${price}€/jour`;

  function getPhotographerPreview() {
    return `<a class="preview-card" href="${photographerUrl}"><div class="img-wrapper"><img alt="${altText}" src="${pictureUrl}" alt="bonhomme"></div><h2>${name}</h2><p class="location">${city}, ${country}</p><p class="tagline">${tagline}</p><p class="price">${formattedPrice}</p></a>`;
  }
  return { getPhotographerPreview };
}
