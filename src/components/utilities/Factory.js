export default function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/photographers_ID/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h5 = document.createElement("h5");
    h5.textContent = `${city}, ${country}`;
    const h6 = document.createElement("h6");
    h6.textContent = tagline;
    const span = document.createElement("span");
    span.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h5);
    article.appendChild(h6);
    article.appendChild(span);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
