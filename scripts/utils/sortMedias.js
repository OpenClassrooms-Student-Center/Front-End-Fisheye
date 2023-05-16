import { getMediasByPhotographer } from "./getMediasByPhotographer";

export async function sortMedias() {
  const dropdown = document.getElementById("sort__by").value;
  const data = await getMediasByPhotographer;
  let result

  switch (dropdown) {
    case "Popularity":
      result = data.sort(function(a, b){
        return b.likes - a.likes
      })
      break;
    case "Date":
      result = data.sort(function(a, b){
        return b.date - a.date
      })
      break;
    case "Title":
      result = data.sort(function(a, b){
        return a.title - b.title
      })
      break;
    }
    console.log(result);
}
