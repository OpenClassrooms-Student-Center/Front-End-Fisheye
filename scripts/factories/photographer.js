function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline, id, likes } = data;

  function getUserCardDOM() {
    const article = document.createElement("article");

    article.innerHTML = ` <a href="photographer.html?id=${id}" class="photographer-link" aria-label="${name}">
                          <img src="assets/photographers/${portrait}" class="portrait" alt="">
                          <h2 class="name">${name}</h2>
                          </a>
                          <h3 class="location">${city}, ${country}</h3>
                          <p class="tagline">${tagline}</p>
                          <p class="price">${price}€/jour</p>
                        `;
    return article;
  }

  return {
    name,
    id,
    portrait,
    city,
    country,
    price,
    tagline,
    likes,
    getUserCardDOM,
  };
}
