// la fonction photographerFactory a pour paramêtre data (le photographers.json)
function photographerFactory(data) {
  // la constante se compose d'un objet doté  de name et portrait et dont la valeur renvoi à data
  const { city, country, name, tagline, portrait, price } = data;
  console.log(price);
  /* la constante picture à pour valeur le chemin assets/photographers
     et fera une interpolation de chaine
     dans ce chemin afin d'insérer un portrait dedans.
  */
  const picture = `assets/photographersMini/${portrait}`;
  // la fonction getUserCardDOM permet :
  function getUserCardDOM() {
    // crée l'article mais n'existe que dans le javascript
    const article = document.createElement("article");
    // fonction permettant au moment ou on clique dessus, de pouvoir accéder à la page du photographer.html
    article.onclick = function () {
      location.href = "photographer.html";
    };
    article.style.cursor ="pointer";
    // create the image element
    const img = document.createElement("img");
    // le setAttribute montre le changement de la valeur src en picture
    // => le src renverra grâce à son lien à la picture
    img.setAttribute("src", picture);
    article.appendChild(img);
    img.style.borderRadius = "100%";
    img.style.objectFit = "cover";

    // create the h2 element to the article
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);

    // create the city and country element
    const divCityAndCountry = document.createElement("div");
    divCityAndCountry.textContent = city + ", " + country;
    article.appendChild(divCityAndCountry);
    divCityAndCountry.style.color = "#901c1c";

    // create the tagline element
    const divTagLine = document.createElement("div");
    divTagLine.textContent = tagline;
    article.appendChild(divTagLine);
    divTagLine.style.color = "black";
    divTagLine.style.fontSize = "13px";

    // create the Price element
    const divPrice = document.createElement("div");
    divPrice.textContent = price + "€/jour";
    article.appendChild(divPrice);
    divPrice.style.color = "grey";
    divPrice.style.fontSize = "13px";

    // retourne à l'article
    return article;
  }
  return { name, picture, getUserCardDOM };
}
