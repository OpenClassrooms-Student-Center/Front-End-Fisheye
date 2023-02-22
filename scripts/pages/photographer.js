//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
let photographerId = params.get("id");

let totalLikes = 0;
let photographerPrice = 0;

console.log(photographerId);

const mediaContainer = document.querySelector(".media-container");

const select = document.querySelector("select");
select.addEventListener("change", async (e) => {
  mediaContainer.innerHTML = ``;
  totalLikes = 0;
  const medias = await getPhotographerMedias();
  const sortBy = e.target.value;
  const sortedMedias = sort(medias, sortBy);
  displayMedias(sortedMedias);
});

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

    mediaCard.setAttribute("tabindex", 0);
    mediaCard.addEventListener("click", () =>
      openCarousel(main, media, medias, index)
    );
    mediaCard.addEventListener("keypress", () =>
      openCarousel(main, media, medias, index, totalLikes)
    );

    mediaContainer.appendChild(mediaCard);

    const infosBlock = document.querySelector(".info-block");
    const totalLikesDisplay = infosBlock.querySelector(".info-block-likes");
    const priceDisplay = infosBlock.querySelector(".info-block-price");
    totalLikesDisplay.textContent = totalLikes;
    priceDisplay.innerHTML = `${photographerPrice} €/jour`;

    totalLikes += media.likes;
  });
}

/** Fonction pour le systeme de tri **/
function sort(array, value) {
  const sortedArray = array.sort(function (a, b) {
    if (typeof a[value] === "string" && typeof b[value] === "string") {
      return a[value].localeCompare(b[value]);
    }
    return a[value] - b[value];
  });
  if (value === "likes") {
    sortedArray.reverse();
  }
  return sortedArray;
}

/** fonction init **/
async function init() {
  const photographer = await getPhotographers();
  const medias = await getPhotographerMedias();
  displayPhotographerData(photographer);
  displayMedias(medias);
}

init();
