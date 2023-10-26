//Imports

import {
  photographInfoTemplate,
  photographPicture,
  mediasTemplate,
} from "../templates/photographer.js";

//JSON Datas
export async function getDataPhotographers() {
  const dataPhotographers = await fetch("../../data/photographers.json");
  return dataPhotographers.json();
}

/////////////////////HEADER

function displayInfo(photographer) {
  const photographerInfo = document.querySelector(".photograph-info");
  const photographerPictureSection = document.querySelector(
    ".photograph-profilephoto"
  );

  const photographerModel = photographInfoTemplate(photographer);
  const userCardInfoDOM = photographerModel.getUserInfoDOM();
  const photographerPicture = photographPicture(photographer);
  const userPicture = photographerPicture.getUserPicture();

  photographerInfo.appendChild(userCardInfoDOM);
  photographerPictureSection.appendChild(userPicture);
}

//////////////SORTED LIST

////DOM ELEMENTS
const sortButton = document.getElementById("sort-button");
const sortOptionContainer = document.getElementById("sort-option-container");
const sortOptions = document.querySelectorAll(".sort-option");
const arrowDiv = document.getElementById("sort-arrow");

let isMenuOpen = false;

////DISPLYING MENU LIST

sortButton.addEventListener("click", menuToggle);

function menuToggle() {
  if (isMenuOpen) {
    sortOptionContainer.style.display = "none";
    sortButton.setAttribute("aria-expanded", "false");
    sortButton.style.padding = "20px 15px";
    arrowDiv.classList.add("arrow-down");
    arrowDiv.classList.remove("arrow-up");
    isMenuOpen = false;
  } else {
    sortOptionContainer.style.display = "block";
    sortButton.style.padding = "20px 15px 0";
    sortButton.setAttribute("aria-expanded", "true");
    arrowDiv.classList.add("arrow-up");
    arrowDiv.classList.remove("arrow-down");

    isMenuOpen = true;
  }
}

sortOptions.forEach((option) => {
  option.addEventListener("click", function () {
    sortButton.querySelector("span").textContent = this.textContent;

    menuToggle();

    sortOptions.forEach((item) => {
      item.classList.toggle("display-none", item === this);
    });

    sortButton.setAttribute("aria-expanded", "false");
  });
});

/////////////////MEDIAS

function displayMediaUpdate(sortedMedia, targetElement) {
  // Clear the current content
  targetElement.innerHTML = "";

  // Loop through the sorted media and append them to the target element
  sortedMedia.forEach((mediaItem) => {
    targetElement.appendChild(mediaItem);
  });
}

function sortedByPopularityMedia(photographer, allMedia) {
  return allMedia
    .filter((media) => media.photographerId === photographer.id)
    .sort((a, b) => b.likes - a.likes)
    .map((media) => {
      const mediaModel = mediasTemplate(photographer, media);
      return mediaModel;
    });
}

function sortedByDateMedia(photographer, allMedia) {
  return allMedia
    .filter((media) => media.photographerId == photographer.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((media) => {
      const mediaModel = mediasTemplate(photographer, media);
      return mediaModel;
    });
}

function sortedByTitleMedia(photographer, allMedia) {
  return allMedia
    .filter((media) => media.photographerId == photographer.id)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((media) => {
      const mediaModel = mediasTemplate(photographer, media);
      return mediaModel;
    });
}

//Function init

async function init() {
  // JSON DATAS
  const { photographers, media } = await getDataPhotographers();

  const param = new URLSearchParams(document.location.search);
  const id = param.get("id");
  let photographer;

  if (!id) {
    console.error("missing id parameter");
    return;
  }

  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      photographer = photographers[i];
    }
  }

  displayInfo(photographer);

  //MEDIAS
  const sectionMedia = document.querySelector(".media");

  ///Sorted medias

  const popularOption = document.querySelector(
    ".sort-option[data-value='popularity']"
  );
  const dateOption = document.querySelector(".sort-option[data-value='date']");
  const titleOption = document.querySelector(
    ".sort-option[data-value='title']"
  );

  const sortedByPopularity = sortedByPopularityMedia(photographer, media);

  //by default
  displayMediaUpdate(sortedByPopularity, sectionMedia);

  //by popularity (the most liked media first)
  popularOption.addEventListener("click", () => {
    displayMediaUpdate(sortedByPopularity, sectionMedia);
  });

  //by date (the most recent first)
  const sortedByDate = sortedByDateMedia(photographer, media);

  dateOption.addEventListener("click", () => {
    displayMediaUpdate(sortedByDate, sectionMedia);
  });

  //by title (alphabetical order)
  titleOption.addEventListener("click", () => {
    const sortedByTitle = sortedByTitleMedia(photographer, media);
    displayMediaUpdate(sortedByTitle, sectionMedia);
  });
}

init();
