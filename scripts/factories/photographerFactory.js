// Create the photographer profile on index.html

function photographerFactory(data) {
  const { name, city, country, price, tagline, id, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.href = `http://127.0.0.1:5500/photographer.html?id=${id}`;
    link.className = "link";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.className = "profil-picture";
    img.setAttribute("alt", "photographer profile image");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.className = "fullname";
    const para = document.createElement("p");
    para.textContent = city + ", " + country;
    para.className = "location";
    const quote = document.createElement("p");
    quote.textContent = tagline;
    quote.className = "quote";
    const prix = document.createElement("p");
    prix.textContent = price + "€/jour";
    prix.className = "fees";

    //Raccorde tous les elements ensemble
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(para);
    article.appendChild(quote);
    article.appendChild(prix);

    return article;
  }

  return { name, city, country, price, tagline, id, picture, getUserCardDOM };
}
