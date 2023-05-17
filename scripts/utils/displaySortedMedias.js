import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "./getMediasByPhotographer.js";


// sortedMedias.forEach(media => {
//   const data = mediaFactory(media);
//   data.getMediaCardDom();
//   totalLikes += media.likes
// });
async function sortMedias() {
  const dropdown = document.getElementById("sort__by").value;
  const data = await getMediasByPhotographer();
  let sortedMedias;

  switch (dropdown) {
    case "Popularity":
      sortedMedias = data.sort((a,b) => b.likes - a.likes);
      break;
    case "Date":
      sortedMedias = data.sort((a,b) => b.date - a.date);
      break;
    case "Title":
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

export async function displaySortedMedias() {

  const sortedMedias = await sortMedias();
  sortedMedias.forEach(media => {
    const data = mediaFactory(media);
    data.getMediaCardDom();
  });
}
