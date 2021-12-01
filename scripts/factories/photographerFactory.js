function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    //const img = document.createElement("img");
    //img.setAttribute("src", picture);
    //const h2 = document.createElement("h2");
    //h2.textContent = name;
    //article.appendChild(img);
    //article.appendChild(h2);

    const content = `
    <a class="photographer_section a" href="photographer.html">
        <img src="${picture}" class="photographer_section article img"></img>
        <h2 class="photographer_section article h2">${name}</h2>
    </a>
    <p class="photographer_section_country">${city}, ${country}</p>
    <p class="photographer_section_tagline">${tagline}</p>
    <p class="photographer_section_price">${price}€/jour</p>
`;

    article.innerHTML = content;

    return article;
  }
  return { name, picture, getUserCardDOM };
}
/* ?? CREER UNE class PhotographerFactory {
  constructor(photographer) {
    this.photographer = photographer;
  }
  getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = this.photographer.name;
    article.appendChild(img);
    article.appendChild(h2);
}}*/
