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

async function init() {
  const photographer = await getPhotographer();
  const photographerModel = photographerFactory(photographer);
  const medias = await photographerModel.getMedias();

  const filtersTag = document.querySelector("#filters");
  const filtersDropdown = document.querySelector(".filters-options");

  filtersTag.addEventListener("click", () => {
    filtersDropdown.classList.toggle("display-options");
    filtersTag.classList.toggle("hide-border-radius");
  });

  const filtersOptions = document.querySelectorAll(".filters-options");

  filtersOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      const filter = event.target.innerText;
      displayFilteredMedias(filter, medias);
      filtersDropdown.classList.toggle("display-options");
      filtersTag.classList.toggle("hide-border-radius");
      filtersTag.innerText = filter;
    });
  });
}

init();
