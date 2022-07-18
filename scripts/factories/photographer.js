import { PHOTO_PORTRAIT } from "../../constants/index.js";

/**
 *
 * @returns {Object} containing information about photographer
 */
export function photographerFactory(data) {
  const { name, portrait, city, country, tagline } = data;

  const picture = PHOTO_PORTRAIT() + portrait;

  /**
   * @return {HTMLElement} article
   */
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    img.setAttribute("src", picture);
    h2.textContent = name;
    p1.textContent = article.appendChild(img);
    p1.textContent = city + ", " + country;
    p2.textContent = tagline;

    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);

    return article;
  }

  return { name, picture, getUserCardDOM };
}
