function photographerFactory(data) {
  const { place, tagline, price, name, portrait, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const index = `${id}`;
  const alt = `${name}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("id", index);
    img.setAttribute("alt", alt);
    const h2 = document.createElement("h2");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    h2.textContent = name;
    p1.textContent = place;
    p2.textContent = tagline;
    p3.textContent = price;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);

    h2.className = "name";
    p1.className = "place";
    p2.className = "tagline";
    p3.className = "price";
    img.className = "photographers";

    return article;
  }

  console.log(data);
  return { place, tagline, price, name, picture, index, alt, getUserCardDOM };
}
