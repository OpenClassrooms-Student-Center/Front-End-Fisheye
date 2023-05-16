import { getMediasByPhotographer } from "./getMediasByPhotographer.js";

export async function sortMedias() {
  const dropdown = document.getElementById("sort__by").value;
  console.log(dropdown);
  const data = await getMediasByPhotographer();
  let sortedDatas;

  switch (dropdown) {
    case "Popularity":
      sortedDatas = data.sort(function(a,b) {
        b.likes - a.likes
      });
      // console.log(`by like: ${sortedDatas.map(o => [o.title, o.likes, o.date])}`);
      // console.log(sortedDatas);
      return sortedDatas
    case "Date":
      sortedDatas = data.sort(function(a,b) {
        b.date - a.date
      });
      // console.log(`by date: ${sortedDatas.map(o => [o.title, o.likes, o.date])}`);
      // console.log(sortedDatas);
      return sortedDatas
    case "Title":
      sortedDatas = data.sort(function(a,b) {
        a.title - b.title
      });
      // console.log(`by title: ${sortedDatas.map(o => [o.title, o.likes, o.date])}`);
      // console.log(sortedDatas);
      return sortedDatas
    default:
      break;
    }
}
