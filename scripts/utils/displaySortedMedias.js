import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "./getMediasByPhotographer.js";

export function openOptionsList() {

  const button = document.querySelector(".sort__button");
  const list = document.querySelector(".sort__options");
  button.addEventListener("click", function() {
    const sort = document.querySelector(".sort__select");
    sort.classList.toggle("sort__select-open");
    if (sort.classList.contains("sort__select-open")) {
      button.setAttribute("aria-expanded", "true");
      sort.querySelector("i").classList.toggle("fa-caret-up");
      sort.querySelector("i").classList.remove("fa-caret-down");
      list.style.display = "block";
    }

  })
}
function closeOptionsList() {
  const button = document.querySelector(".sort__button");
  const list = document.querySelector(".sort__options");
  const sort = document.querySelector(".sort__select");
  button.setAttribute("aria-expanded", "false");
  sort.querySelector("i").classList.add("fa-caret-down");
  sort.querySelector("i").classList.remove("fa-caret-up");
  sort.classList.toggle("sort__select-open");
  list.style.display = "none"

}

export function selectOption() {
  const options = document.querySelectorAll(".sort__option");
  const orderBtn = document.querySelector(".sort__button");

  options.forEach(option => {
    option.classList.remove("sort__hide");
    option.setAttribute("aria-selected", "false");
    option.style.display = "block"
    option.addEventListener("click", (event) => {
      orderBtn.innerText = event.target.innerText;
      option.classList.add("sort__hide");
      option.setAttribute("aria-selected", "true");
      // console.log(orderBtn);
      closeOptionsList();
      const selectedOption = Array.from(options).find(option => option.innerText === orderBtn.innerText);
      console.log(selectedOption);
      selectedOption.style.display = "none"
      const otherOptions = Array.from(options).filter(option => option.innerText !== orderBtn.innerText);
      console.log(otherOptions);
      otherOptions.forEach(option => option.style.display = "block")
    })
  })
}

export async function sortMedias() {
  const dropdown = document.querySelector(".sort__select").innerText;
  // console.log(dropdown);
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
