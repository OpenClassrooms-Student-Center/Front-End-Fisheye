function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  //Création des cards de chaque photographe
  function getUserCardDOM() {
    //Création de la balise article
    const article = document.createElement("article");

    //Création de la balise image
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    //Création de la balise h2
    const h2 = document.createElement("h2");
    h2.textContent = name;

    //Création de la balise p
    const adresse = document.createElement("p");
    adresse.textContent = `${city}, ${country}`;
    adresse.classList.add("adresse");

    //Création de la balise p
    const tag = document.createElement("p");
    tag.textContent = tagline;
    tag.classList.add("tagline");

    //Création de la balise p
    const priceTag = document.createElement("p");
    priceTag.textContent = `${price} €/jours`;
    priceTag.classList.add("price");

    //Création du lien vers la page de profil
    const link = document.createElement("a");
    link.setAttribute("href", "profil.html");

    //Je crée un lien qui va me permettre de faire apparaître la page de profil
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(adresse);
    article.appendChild(tag);
    article.appendChild(priceTag);
    return article;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
