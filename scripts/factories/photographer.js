function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const priceDay = `${price}€/jour`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const link = document.createElement("a");
    const pLocation = document.createElement("p");
    const pTagLine = document.createElement("p");
    const pPrice = document.createElement("p");
    h2.textContent = name;
    pLocation.textContent = location;
    pTagLine.textContent = tagline;
    pPrice.textContent = priceDay;
    link.href = `/photographer.html?i=${id}`;
    link.appendChild(img);
    link.appendChild(h2);
    div.appendChild(pLocation);
    div.appendChild(pTagLine);
    div.appendChild(pPrice);
    article.appendChild(link);
    article.appendChild(div);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
