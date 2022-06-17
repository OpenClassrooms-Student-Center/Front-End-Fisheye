import { URL } from "../../constants/index.js";
import { AsideLikes } from "../components/asideLikes/index.js";
import { Filter } from "../components/filter/index.js";
import { PhotographerProfilHeader } from "../components/photographerProfile/index.js";
import { MediasFactory } from "../factories/photographerMediaFactory.js";
import { getData } from "../services/getData.js";

const data = await getData(URL);
const id = parseInt(new URLSearchParams(location.search).get("photographer"));
const { photographers } = data;

const currentPhotographer = photographers.find(
  (photographer) => photographer.id === id
);
// console.log("ID => ", id);
const PhotographerProfil = async (data, id) => {
  const sectionHeaderPhotographer = document.querySelector(
    ".section-photographe"
  );
  const photographeCardHeader = new PhotographerProfilHeader(
    currentPhotographer
  );

  sectionHeaderPhotographer.innerHTML =
    photographeCardHeader.createUserProfil();
};

/**
 * display dropList for sorting media
 */

const generateMediaFilter = () => {
  const section = document.querySelector(".filter");
  const mediaFilter = new Filter();
  section.innerHTML = mediaFilter.createDropListFilter();
};

/**
 * Get total likes
 */
const implementTotalLikes = () => {
  const globalLikes = document.querySelector(".globalLikes");
  const mediaLikes = document.querySelectorAll(".likes");
  let likes = 0;
  mediaLikes.forEach((element) => {
    console.log("element ==> ", element);
    likes = likes + parseInt(element.innerText);
    console.log("element likes  ==> ", likes);
  });

  globalLikes.innerText = likes;
};

/**
 * Get the likes for each media of the currentPhotographer
 * @param {Single media} media
 */
const individualLikesCount = (media) => {
  const likeButton = document.getElementById(media.id);

  if (media.liked === "true") {
    likeButton.checked = true;
  }
  let nbLikes = parseInt(media.likes);

  // Keyboard event
  likeButton.parentElement.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      likeButton.click();
      e.preventDefault();
    }
  });

  likeButton.addEventListener("change", () => {
    if (media.liked === undefined || media.liked === "false") {
      nbLikes += 1;
      media.liked = "true";
      likeButton.parentElement.setAttribute("aria-label", "liké");
    } else {
      nbLikes -= 1;
      media.liked = "false";
    }

    // redefine the number of media likes
    media.likes = nbLikes;
    likeButton.parentElement.previousElementSibling.textContent = nbLikes;
    implementTotalLikes();
  });
};

/**
 * Display aside component including likes infos
 */
const displayGlobalLikes = () => {
  const { media: medias } = data;
  const currentMedias = medias.filter((media) => media.photographerId === id);
  const main = document.getElementById("main");
  const globalCount = new AsideLikes(currentMedias, currentPhotographer);
  main.appendChild(globalCount.createAsideLikes());
};

/**
 * Generate medias of current photographer
 * @param {* photographer media} currentMedias
 * @param {*} currentPhotographer
 */
const generatePhotographerMedias = (currentMedias, currentPhotographer) => {
  const portfolioBlock = document.querySelector(".portfolio");
  portfolioBlock.innerHTML = "";
  currentMedias.forEach((media) => {
    const photoCardDOM = new MediasFactory(media, currentPhotographer.name);
    portfolioBlock.appendChild(photoCardDOM.buildMediaCard());
    individualLikesCount(media);
  });
};

/**
 * Manage dropdown widget options
 * @param {*} widgetOpen
 * @param {*} sortOptions
 * @param {*} optionShowed
 */
const manageOptions = (widgetOpen, sortOptions, optionShowed) => {
  if (widgetOpen == false) {
    sortOptions.forEach((option) => {
      option.style.display = "block";
    });
    optionShowed[0].focus();
    widgetOpen = true;
  } else {
    sortOptions.forEach((option) => {
      option.style.display = "none";
    });
    widgetOpen = false;
  }
};

/**
 *
 * @param {*} element
 * @param {*} sortOptions
 * @param {*} toggleBox
 * @param {*} widgetOpen
 */
const sortBy = (element, sortOptions, toggleBox, widgetOpen, optionShowed) => {
  const { media: medias } = data;
  const currentMedias = medias?.filter((media) => media.photographerId === id);
  switch (element.value) {
    case "popularity":
      currentMedias?.sort(function (a, b) {
        return b.likes - a.likes;
      });
      break;
    case "date":
      currentMedias?.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case "title":
      currentMedias?.sort(function (a, b) {
        return a.title?.localeCompare(b.title);
      });
      break;
  }
  generatePhotographerMedias(currentMedias, currentPhotographer);

  // new list of options
  const hideElement = document.querySelector(".hidden button");
  const activeOption = document.querySelector(".active-option");
  const currentButtonPos = sortOptions.indexOf(element);
  const clickedOptionValue = sortOptions[currentButtonPos].innerText;
  activeOption.innerText = clickedOptionValue;
  toggleBox.setAttribute(
    "aria-label",
    `liste de trie, trié par ${clickedOptionValue}`
  );
  document.querySelector(".dropdown").appendChild(hideElement);
  document.querySelector(".hidden").appendChild(element);
  optionShowed = document.querySelectorAll(".dropdown > button");

  // close the sortwidget after clicking on an option
  sortOptions.forEach((option) => {
    console.log("je suis ici ====");
    option.style.display = "none";
  });
  widgetOpen = false;
  toggleBox.focus();
};

const getSortedMedias = () => {
  const toggleBox = document.querySelector(".toggle-listbox");
  const sortOptions = Array.from(document.querySelectorAll(".sort-option"));
  let optionShowed = document.querySelectorAll(".dropdown > button");
  let widgetOpen = false;
  console.log("variables :", toggleBox, sortOptions, optionShowed, widgetOpen);

  // togglebox button property
  toggleBox.addEventListener("click", () =>
    manageOptions(widgetOpen, sortOptions, optionShowed)
  );

  sortOptions.forEach((element) =>
    element.addEventListener("click", () =>
      sortBy(element, sortOptions, toggleBox, widgetOpen, optionShowed)
    )
  );
};

/**
 * Initialize all photographer infos
 */
const initMedias = async () => {
  const { media: medias } = data;
  const currentMedias = medias.filter((media) => media.photographerId === id);

  PhotographerProfil(data, id);
  generateMediaFilter();
  generatePhotographerMedias(currentMedias, currentPhotographer);
  getSortedMedias();
  displayGlobalLikes();
};

initMedias();