function photographerFactory(data) {
  const { name, portrait, city, id, country, tagline, price, altText } = data;

  const photographerUrl = `photographer.html?url=${id}`;
  const pictureUrl = `assets/photographers/${portrait}`;
  const formattedPrice = `${price}/jour`;

  function getPhotographerPreview() {
    return `<a class="preview-card" href="${photographerUrl}"><img alt=${altText} src="${pictureUrl}" alt="bonhomme"><h2>${name}</h2><p class="location">${city}, ${country}</p><p class="tagline">${tagline}</p><p class="price">${formattedPrice}</p></a>`;
  }
  return { getPhotographerPreview };
}
