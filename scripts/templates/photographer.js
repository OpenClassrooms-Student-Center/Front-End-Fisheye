function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityName = document.createElement("h3");
    cityName.textContent = city + ", " + country;
    const taglineText = document.createElement("p");
    taglineText.classList.add("taglineText");
    taglineText.textContent = tagline;
    const priceTag = document.createElement("p");
    priceTag.classList.add("priceTag");
    priceTag.textContent = price + "€/jours";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(cityName);
    article.appendChild(taglineText);
    article.appendChild(priceTag);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
