import { mediaFactory } from "../factories/mediaFactory.js";
import { getMediasByPhotographer } from "./getMediasByPhotographer.js";


// en fonction de l'option choisie, et donc du texte contenu dans le bouton, trie l'array de media en fonction, et retourne l'array trié
export async function sortMedias() {
  const dropdown = document.querySelector(".sort__button").innerText;
  const data = await getMediasByPhotographer();
  let sortedMedias;

  switch (dropdown) {
    case "Popularité":
      sortedMedias = data.sort((a,b) => b.likes - a.likes);
      break;

    case "Date":
      sortedMedias = data.sort((a,b) => b.date - a.date);
      break;
    case "Titre":
      sortedMedias = data.sort(function(a,b) {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      });
      break;
    default:
      break;
  }
  return sortedMedias;
}


// à partir de l'array trié, crée la card pour chaque media
export async function createSortedMediasCards() {

  const sortedMedias = await sortMedias();
  sortedMedias.forEach(media => {
    const data = mediaFactory(media);
    data.getMediaCardDom();
  });
}
