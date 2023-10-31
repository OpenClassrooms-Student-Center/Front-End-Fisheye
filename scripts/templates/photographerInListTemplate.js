//  Fonction factory pour créer une card photographe sur la page d accueil
function photographerInListTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function redirectToDetailPage() {
    // Rediriger vers la page détaillée avec l'ID comme paramètre
    window.location.href = `/photographer.html?id=${id}`;
  }

  function handleKeyDown(event) {
    // Si la touche "Entrée" est pressée
    if (event.key === "Enter") {
      redirectToDetailPage();
    }
  }

  function getUserCardDOM() {
    // NOEUDS PAGE ACCUEIL
    const $article = document.createElement("article");
    const $img = document.createElement("img");
    const $h2 = document.createElement("h2");
    const $div = document.createElement("div");
    const $p1 = document.createElement("p");
    const $p2 = document.createElement("p");
    const $p3 = document.createElement("p");

    // Ajout de l'attribut data-id à l'élément article
    $article.setAttribute("data-id", id);
    // Ajout de l'attribut aria-label à l'élément article
    const ariaLabel = `${name}, ${city}, ${country}, ${tagline}, ${price}€/jour`;
    $article.setAttribute("aria-label", ariaLabel);
    $article.setAttribute("tabindex", "0"); // Rend l'élément focusable
    $article.setAttribute("role", "button"); // Indique que c'est un élément cliquable

    $article.addEventListener("click", redirectToDetailPage);
    $article.addEventListener("keydown", handleKeyDown);

    $img.setAttribute("src", picture);
    $img.setAttribute("alt", name);
    $h2.textContent = name;
    $p1.textContent = `${city}, ${country}`;
    $p2.textContent = tagline;
    $p3.textContent = price + "€/jour";
    $article.appendChild($img);
    $article.appendChild($div);
    $div.appendChild($h2);
    $div.appendChild($p1);
    $div.appendChild($p2);
    $div.appendChild($p3);

    return $article;
  }
  return { getUserCardDOM };
}
