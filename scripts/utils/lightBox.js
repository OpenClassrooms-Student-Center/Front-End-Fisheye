async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get("id");
  return photographers.find((photographer) => photographer.id == id);
}

async function getMedia(mediaId) {
  const photographer = await getPhotographer();
  const photographerModel = photographerFactory(photographer);
  const medias = await photographerModel.getMedias();
  const media = medias.find((media) => media.id == mediaId);
  return media;
}

async function buildLightBox(mediaId) {
  const media = await getMedia(mediaId);

  const lightBoxModal = document.querySelector("#light-box-modal");
  lightBoxModal.innerHTML = "";

  const lightBoxContent = document.createElement("div");
  const previousButton = document.createElement("img");
  const currentMediaContainer = document.createElement("div");
  const currentMedia = document.createElement("img");
  const currentMediaTitle = document.createElement("h3");
  const nextButton = document.createElement("img");
  const closeButton = document.createElement("img");

  lightBoxContent.classList.add("light-box-content");
  previousButton.classList.add("previous-button");
  currentMediaContainer.classList.add("current-media-container");
  currentMedia.classList.add("current-media");
  currentMediaTitle.classList.add("current-media-title");
  nextButton.classList.add("next-button");
  closeButton.classList.add("close-light-box-button");

  previousButton.src = "assets/icons/arrow-left.svg";
  currentMedia.src = `assets/images/medias/${media.photographerId}/${media.image}`;
  nextButton.src = "assets/icons/arrow-right.svg";
  closeButton.src = "assets/icons/close-red.svg";

  currentMediaTitle.textContent = media.title;

  currentMediaContainer.appendChild(currentMedia);
  currentMediaContainer.appendChild(currentMediaTitle);
  lightBoxContent.appendChild(previousButton);
  lightBoxContent.appendChild(currentMediaContainer);
  lightBoxContent.appendChild(nextButton);
  lightBoxContent.appendChild(closeButton);
  lightBoxModal.appendChild(lightBoxContent);

  previousButton.addEventListener("click", () => {
    buildLightBox(media.previousMedia.id);
  });
  nextButton.addEventListener("click", () => {
    buildLightBox(media.nextMedia.id);
  });
  closeButton.addEventListener("click", () => {
    closeLightBox();
  });
}

function displayLightBox(mediaId) {
  const modal = document.getElementById("light-box-modal");
  modal.style.display = "flex";
  buildLightBox(mediaId);
}

function closeLightBox() {
  const modal = document.getElementById("light-box-modal");
  modal.style.display = "none";
}
