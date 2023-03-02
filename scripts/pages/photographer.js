//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
let photographerId = params.get("id");

let totalLikes = 0;
let photographerPrice = 0;

console.log(photographerId);

const mediaContainer = document.querySelector(".media-container");
let selectedOption = "likes";

/********** Custom select input **********/

const customSelect = document.querySelector(".custom-select");
const arrow = document.querySelector(".arrow");
const options = Array.from(
  customSelect.querySelectorAll(".custom-select-option")
);

customSelect.addEventListener("click", () => handleSelectClick(customSelect));
customSelect.addEventListener("keypress", () =>
  handleSelectClick(customSelect)
);

options.forEach((option) =>
  option.addEventListener("click", (e) => handleOptionClick(e))
);
options.forEach((option) =>
  option.addEventListener("keypress", (e) => handleOptionClick(e))
);

async function handleOptionClick(e) {
  e.stopPropagation();
  const value = e.target.getAttribute("data-value");
  selectedOption = value;
  console.log("Filtre choisi : " + selectedOption);
  const optionsToHide = options.filter(
    (option) => option.textContent !== e.target.textContent
  );
  optionsToHide.forEach((option) => option.classList.remove("visible"));
  options.forEach((option) => {
    option.classList.remove("clickable");
    option.removeAttribute("tabindex");
  });

  customSelect.classList.remove("opened");
  arrow.classList.remove("opened");
  customSelect.setAttribute("tabindex", 0);

  mediaContainer.innerHTML = ``;
  totalLikes = 0;
  const medias = await getPhotographerMedias();
  const sortedMedias = sortSystem(medias, value);
  displayMedias(sortedMedias);
}

function handleSelectClick(element) {
  element.setAttribute("tabindex", -1);
  element.classList.toggle("opened");
  arrow.classList.toggle("opened");
  options.forEach((option) => {
    option.classList.add("visible", "clickable");
    option.setAttribute("tabindex", 1);
  });
}

/** fonction pr récup les photographes **/
async function getPhotographers() {
  const data = await (await fetch("../../data/photographers.json")).json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == photographerId
  );
  return photographer;
}

/** récup les médias des photographes **/
async function getPhotographerMedias() {
  const data = await (await fetch("../../data/photographers.json")).json();
  const photographerMedias = data.media.filter(
    (media) => media.photographerId == photographerId
  );
  return photographerMedias;
}

getPhotographerMedias();

/** Affiche la data **/
async function displayPhotographerData(photographer) {
  photographerPrice = photographer.price;

  const main = document.getElementById("main");
  const photographerHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");
  const photographerModel = photographerFactory(photographer);
  const photographerInfos = photographerModel.getPhotographerProfileHeader();
  photographerHeader.insertBefore(photographerInfos, contactButton);

  const photographerImage = document.createElement("img");
  photographerImage.setAttribute("src", photographerModel.picture);
  photographerImage.setAttribute("alt", `photo de ${photographerModel.name}`);

  photographerHeader.appendChild(photographerImage);

  const mediasContainer = document.createElement("div");
  mediasContainer.classList.add("media-container");
}

async function displayMedias(medias) {
  medias.forEach((media, index) => {
    totalLikes += media.likes;

    let liked = false;

    const medialModel = mediaFactory(media);
    const mediaCard = medialModel.getPhotographerMediaCards();

    const likeButton = mediaCard.querySelector(".likes");
    likeButton.addEventListener("click", (e) => {
      liked = !liked;
      likeMedia(e, media, liked, mediaCard, totalLikes);
    });
    likeButton.addEventListener("keypress", (e) => {
      liked = !liked;
      likeMedia(e, media, liked, mediaCard, totalLikes);
    });

    mediaCard.setAttribute("tabindex", 0);
    mediaCard.addEventListener("click", () =>
      openCarousel(main, media, medias, index)
    );
    mediaCard.addEventListener("keypress", () =>
      openCarousel(main, media, medias, index)
    );

    mediaContainer.appendChild(mediaCard);

    const infosBlock = document.querySelector(".info-block");
    const totalLikesDisplay = infosBlock.querySelector(".info-block-likes");
    const priceDisplay = infosBlock.querySelector(".info-block-price");
    totalLikesDisplay.textContent = totalLikes;
    priceDisplay.innerHTML = `${photographerPrice} €/jour`;
  });
}

/** fonction init **/
async function init() {
  const photographer = await getPhotographers();
  const medias = await getPhotographerMedias();
  const sortedMedias = sortSystem(medias, "likes");
  displayPhotographerData(photographer);
  displayMedias(sortedMedias);
}

init();
