import { PHOTO_PORTRAIT } from "../../constants/index.js";

export function photographerFactory(data) {
  const { name, portrait } = data;

  const picture = PHOTO_PORTRAIT() + portrait;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
