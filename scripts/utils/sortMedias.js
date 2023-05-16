import { getMediasByPhotographer } from "./getMediasByPhotographer.js";

export async function sortMedias() {
  const dropdown = document.getElementById("sort__by").value;
  console.log(dropdown);
  const data = await getMediasByPhotographer();

  switch (dropdown) {
    case "Popularity":
      return data.sort((a,b) => b.likes - a.likes);
    case "Date":
      return data.sort((a,b) => b.date - a.date);
    case "Title":
      return data.sort((a,b) => a.title - b.title);
    default:
      break;
    }
}
