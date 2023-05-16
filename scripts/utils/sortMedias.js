// import { getMediasByPhotographer } from "./getMediasByPhotographer";


export async function sortMedias(data) {
  const dropdown = document.getElementById("sort__by").value;
  console.log(dropdown);
  // const data = await getMediasByPhotographer();
  // console.log(data);
  let result

  switch (dropdown) {
    case "Popularity":
      result = data.sort(function(a, b){
         b.likes - a.likes
      })
      break;
    case "Date":
      result = data.sort(function(a, b){
         b.date - a.date
      })
      break;
    case "Title":
      result = data.sort(function(a, b){
         a.title - b.title
      })
      break;
      default:
        break;
    }
    console.log(result);
}
