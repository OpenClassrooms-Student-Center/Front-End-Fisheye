// la fonction photographerFactory a pour paramêtre data (le photographers.json)
function photographerFactory(data) {
  // la constante se compose d'un objet doté  de name et portrait et dont la valeur renvoi à data
  const { name, portrait } = data;
  /* la constante picture à pour valeur le chemin assets/photographers
     et fera une interpolation de chaine
     dans ce chemin afin d'insérer un portrait dedans.
  */
  const picture = `assets/photographers/${portrait}`;
  // la fonction getUserCardDOM permet :
  function getUserCardDOM() {
    // recupère l'article
    const article = document.createElement("article");
    // recupère l'image
    const img = document.createElement("img");
    // le setAttribute montre le changement de la valeur src en picture => le src renverra grâce à son lien à la picture
    img.setAttribute("src", picture);
    // crée le h2
    const h2 = document.createElement("h2");
    // crée le name
    h2.textContent = name;
    // ajoute une image à l'article
    article.appendChild(img);
    // ajoute un h2 à l'article
    article.appendChild(h2);
    // retourne à l'article
    return article;
  }
  return { name, picture, getUserCardDOM };
}
