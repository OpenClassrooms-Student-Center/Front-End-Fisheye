function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.onclick = function () {
      window.location.href = "./photographer.html";
    };

    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const span = document.createElement("span");
    h2.textContent = name;
    h3.textContent = city + ", ";
    p.textContent = '"' + tagline + '"';
    span.textContent = price + "€/jour";
    article.appendChild(img);
    
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);
    h3.append(country);
    h3.append(id);
    h2.onclick = function () {
      window.location.href = "./photographer.html";
    };
    return article;
  }
  return { name, picture, getUserCardDOM };
}
