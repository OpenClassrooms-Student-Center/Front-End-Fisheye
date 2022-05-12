function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const quote = document.createElement("p");
    const pricing = document.createElement("p");

    img.setAttribute("src", picture);
    img.setAttribute("alt", "photographer portrait");
    h2.textContent = name;
    h3.textContent = `${city}, ${country}`;
    quote.textContent = `${tagline}`;
    pricing.textContent = `${price}/jour`;

    link.setAttribute("href", `photographer.html?id=${id}`);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(h3);
    article.appendChild(quote);
    article.appendChild(pricing);
    return article;
  }
  return { name, picture, id, getUserCardDOM };
}
