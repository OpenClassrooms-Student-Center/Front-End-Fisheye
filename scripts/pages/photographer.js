import { URL } from "../../constants/index.js";
import { AsideLikes } from "../components/asideLikes/index.js";
import { Filter } from "../components/filter/index.js";
import { PhotographerProfilHeader } from "../components/photographerProfile/index.js";
import { MediasFactory } from "../factories/photographerMediaFactory.js";
import { getData } from "../services/getData.js";
import { Form } from "../utils/contactForm.js";
import { Lightbox } from "../utils/lightBox.js";

const data = await getData(URL);
const id = parseInt(new URLSearchParams(location.search).get("photographer"));
const { photographers } = data;

// Current photographer
const currentPhotographer = photographers.find(
  (photographer) => photographer.id === id
);

// Current photographer medias
const { media: medias } = data;
const currentMedias = medias.filter((media) => media.photographerId === id);

// Sort Media by default
currentMedias?.sort(function (a, b) {
  return b.likes - a.likes;
});

const PhotographerProfil = async (data, id) => {
  const sectionHeaderPhotographer = document.querySelector(
    ".section-photographe"
  );

  const photographeCardHeader = new PhotographerProfilHeader(
    currentPhotographer
  );
  sectionHeaderPhotographer.innerHTML =
    photographeCardHeader.createUserProfil();

  //Contact  Form
  new Form(currentPhotographer);
};

/**
 * display dropList for sorting media
 */

const generateMediaFilter = () => {
  const section = document.querySelector(".filter");
  const mediaFilter = new Filter();
  section.innerHTML = mediaFilter.createDropListFilter(true);
};

/**
 * Get total likes
 */
const implementTotalLikes = () => {
  const globalLikes = document.querySelector(".globalLikes");
  const mediaLikes = document.querySelectorAll(".likes");
  let likes = 0;
  mediaLikes.forEach((element) => {
    likes = likes + parseInt(element.innerText);
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
    media.alt = media.title;
    const photoCardDOM = new MediasFactory(media, currentPhotographer.name);
    portfolioBlock.appendChild(photoCardDOM.buildMediaCard());
    individualLikesCount(media);
  });

  Lightbox.init();
};

/**
 *  Manage dropdown widget options
 * @param {boolean} widgetOpen
 * @param {[]} sortOptions
 * @param {HTMLElement} optionShowed
 * @param {HTMLElement} angleUp
 */
const manageOptions = (widgetOpen, sortOptions, optionShowed, angleUp) => {
  if (widgetOpen == false) {
    sortOptions.forEach((option) => {
      option.style.display = "block";
    });
    optionShowed[0].focus();
    widgetOpen = true;
    angleUp.style.display = "block";
  } else {
    sortOptions.forEach((option) => {
      option.style.display = "none";
    });
    widgetOpen = false;
  }
};

/**
 *Sort Photographer Media by dropList filter
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
    option.style.display = "none";
  });

  widgetOpen = false;
  toggleBox.focus();
};

/**
 * Sort photographer Media by their
 *  name, date and popularity
 */
const getSortedMedias = () => {
  const toggleBox = document.querySelector(".toggle-listbox");
  const sortOptions = Array.from(document.querySelectorAll(".sort-option"));
  const angleUp = document.querySelector(".fa-angle-up");
  const angleDown = document.querySelector(".fa-angle-down");
  let optionShowed = document.querySelectorAll(".dropdown > button");
  let widgetOpen = false;

  // togglebox button property
  toggleBox.addEventListener("click", () => {
    if (angleDown != null) {
      angleDown.style.display = "none";
    }
    manageOptions(widgetOpen, sortOptions, optionShowed, angleUp);
  });

  // Events
  sortOptions.forEach((element) =>
    element.addEventListener("click", () => {
      angleDown.style.display = "block";
      sortBy(element, sortOptions, toggleBox, widgetOpen, optionShowed);
      angleUp.style.display = "none";
    })
  );
};

/**
 * Initialize all photographer infos
 */
const initMedias = async () => {
  PhotographerProfil(data, id);
  generateMediaFilter();
  generatePhotographerMedias(currentMedias, currentPhotographer);
  getSortedMedias();
  displayGlobalLikes();
};

initMedias();
