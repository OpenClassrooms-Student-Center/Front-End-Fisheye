// la fonction photographerFactory a pour paramêtre data (le photographers.json)
function photographerFactory(data) {
  // la constante se compose d'un objet doté  de name et portrait et dont la valeur renvoi à data
  const { name, portrait, price } = data;
  console.log(price);
  /* la constante picture à pour valeur le chemin assets/photographers
     et fera une interpolation de chaine
     dans ce chemin afin d'insérer un portrait dedans.
  */
  const picture = `assets/photographers/${portrait}`;
  // la fonction getUserCardDOM permet :
  function getUserCardDOM() {
    // crée l'article mais n'existe que dans le javascript
    const article = document.createElement("article");
    // crée l'image mais n'existe que dans le javascript
    const img = document.createElement("img");
    // le setAttribute montre le changement de la valeur src en picture => le src renverra grâce à son lien à la picture
    img.setAttribute("src", picture);
    // crée le h2 mais n'existe que dans le javascript
    const h2 = document.createElement("h2");
    // le h2 aura le texte suivant ="name"
    h2.textContent = name;
    // ajoute une image à l'article
    article.appendChild(img);
    // ajoute un h2 à l'article
    article.appendChild(h2);
    // retourne à l'article
    const divPrice = document.createElement("div");
    divPrice.textContent = price;
    article.appendChild(divPrice)
    
    return article;
  }
  return { name, picture, getUserCardDOM };
}
