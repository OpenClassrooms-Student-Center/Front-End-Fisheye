import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "./getMediasByPhotographer.js";

export function toggleOptionsList() {

  const button = document.querySelector(".sort__button");
  button.addEventListener("click", function() {
    const sort = document.querySelector(".sort__select");
    sort.classList.toggle("sort__select-open");
    if (sort.classList.contains("sort__select-open")) {
      button.setAttribute("aria-expanded", "true");
      sort.querySelector("i").classList.add("fa-caret-up");
      sort.querySelector("i").classList.remove("fa-caret-down");
    } else {
      button.setAttribute("aria-expanded", "false");
      sort.querySelector("i").classList.add("fa-caret-down");
      sort.querySelector("i").classList.remove("fa-caret-up");
    }
  })
}

export function selectOption() {
  const currentOption = document.querySelectorAll(".sort__hide");
  currentOption.forEach(option => {
    option.addEventListener("click", function(event) {
      console.log(event.target)
    })
  })

}

export async function sortMedias() {
  const dropdown = document.querySelector(".sort__select").innerText;
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

export async function displaySortedMedias() {

  const sortedMedias = await sortMedias();
  sortedMedias.forEach(media => {
    const data = mediaFactory(media);
    data.getMediaCardDom();
  });
}
