async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get("id");
  return photographers.find((photographer) => photographer.id == id);
}

function displayMediasSortByDate(medias) {
  const mediasSection = document.querySelector(".medias");
  mediasSection.innerHTML = "";

  const sortedMedias = medias.sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasSection.appendChild(mediaCard);
  });
}

function displayMediasSortByPopularity(medias) {
  const mediasSection = document.querySelector(".medias");
  mediasSection.innerHTML = "";

  const sortedMedias = medias.sort((a, b) => b.likes - a.likes);

  sortedMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasSection.appendChild(mediaCard);
  });
}

function displayMediasSortByTitle(medias) {
  const mediasSection = document.querySelector(".medias");
  mediasSection.innerHTML = "";
  const sortedMedias = medias.sort((a, b) => a.title.localeCompare(b.title));
  
  sortedMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasSection.appendChild(mediaCard);
  });
}

async function initFilters() {
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
  let selectedFilter;

  filtersOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      selectedFilter = event.target.innerText;
      if(selectedFilter === "Popularité") {
        displayMediasSortByPopularity(medias);
      }
      if(selectedFilter === "Titre") {
        displayMediasSortByTitle(medias);
      }
      if(selectedFilter === "Date") {
        displayMediasSortByDate(medias);
      }
      filtersDropdown.classList.toggle("display-options");
      filtersTag.classList.toggle("hide-border-radius");
      filtersTag.innerText = event.target.innerText;
    });
  });
}

initFilters();
