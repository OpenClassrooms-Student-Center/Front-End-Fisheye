import { getPhotographers } from "./fetchData.js";

export async function getMediasByPhotographer() {
  const { media } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));

  // console.log(media.filter(media => media.photographerId === id))
  const medias =  media.filter(media => media.photographerId === id)
  // console.log(medias);
  const dropdown = document.getElementById("sort__by");
  // console.log(dropdown);
  return medias
}

export async function sortMedias() {
  const dropdown = document.getElementById("sort__by").value;
  // console.log(dropdown);
  const data = await getMediasByPhotographer();

  switch (dropdown) {
    case "Popularity":
      data.sort(function(a, b){
        return b.likes - a.likes
      })
      break;
    case "Date":
      data.sort(function(a, b){
        return b.date - a.date
      })
      break;
    case "Title":
      data.sort(function(a, b){
        return a.title - b.title
      })
      break;
  }
}
