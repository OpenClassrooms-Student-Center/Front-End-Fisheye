async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get("id");
  return photographers.find((photographer) => photographer.id == id);
}

function displaySortedMedias(sortedMedias) {
  const mediasSection = document.querySelector(".medias");
  mediasSection.innerHTML = "";
  sortedMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasSection.appendChild(mediaCard);
  });
}

function displayFilteredMedias(filter, medias) {
  let sortedMedias;
  if (filter === "Popularité") {
    sortedMedias = medias.sort((a, b) => b.likes - a.likes);
  }
  if (filter === "Titre") {
    sortedMedias = medias.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (filter === "Date") {
    sortedMedias = medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return displaySortedMedias(sortedMedias);
}

function openDropdown() {
  const filtersTag = document.querySelector("#filters");
  const filtersDropdown = document.querySelector(".filters-options");
  const arrow = document.querySelector(".arrow-y");
  arrow.classList.toggle("rotate-arrow");
  filtersTag.classList.toggle("hide-border-radius");
  filtersDropdown.classList.toggle("display-options");
}

function selectFilter(event, option, medias) {
  const currentFilterTag = document.querySelector(".current-filter");
  const selectedFilter = event.target.innerText;
  const filtersDropdown = document.querySelector(".filters-options");
  const filtersTag = document.querySelector("#filters");

  displayFilteredMedias(selectedFilter, medias);

  option.innerText = currentFilterTag.innerText;
  currentFilterTag.innerText = selectedFilter;

  filtersDropdown.classList.toggle("display-options");
  filtersTag.classList.toggle("hide-border-radius");

  const arrow = document.querySelector(".arrow-y");
  arrow.classList.remove("rotate-arrow");
}

async function init() {
  const photographer = await getPhotographer();
  const photographerModel = photographerFactory(photographer);
  const medias = await photographerModel.getMedias();

  const filtersTag = document.querySelector("#filters");
  const filtersOptions = document.querySelectorAll(".filters-option");

  filtersTag.addEventListener("click", () => {
    openDropdown();
  });
  filtersTag.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      openDropdown();
    }
  });
  filtersOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      selectFilter(event, option, medias);
    });
    option.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        selectFilter(event, option, medias);
        filtersTag.focus();
      }
    });
  });

  displayFilteredMedias("Popularité", medias);
}

init();
