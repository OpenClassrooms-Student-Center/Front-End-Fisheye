function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img src="${picture}" alt="${name}">
        </a>
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
    `;
    return article;
  }
  return { name, picture, getUserCardDOM };
}
