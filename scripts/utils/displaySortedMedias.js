import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "./getMediasByPhotographer.js";

export function toggleOptionsList() {
  const select = document.querySelector(".sort__select");
  const sort_list = document.querySelector(".sort__list");
  select.addEventListener("click", () => {
    sort_list.classList.toggle("active");
    select.querySelector("i").classList.toggle("fa-caret-down");
    select.querySelector("i").classList.toggle("fa-caret-up");
  });
}

export function selectOption() {
  const select = document.querySelector(".sort__select");
  const sort_list = document.querySelector(".sort__list");
  const options = document.querySelectorAll(".sort__option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      select.innerHTML = `${option.innerText} <i class="fa-solid fa-caret-down"></i>`;
      sort_list.classList.toggle("active");
    });
  });
}

async function sortMedias() {
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
