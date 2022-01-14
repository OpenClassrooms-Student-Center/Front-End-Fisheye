const currentUrl = new URL(window.location.href);
const photographerId = parseInt(currentUrl.searchParams.get("id"));

function displayPhotographer(photographer) {
  document.getElementById("description").innerHTML +=
    photographer.getPhotographerDetailsDOM();
  document
    .getElementById("profile-pic")
    .setAttribute("src", photographer.getPortraitUrl());
  document
    .getElementById("profile-pic")
    .setAttribute("alt", photographer.altText);
  document.getElementById("price-count").innerText =
    photographer.getFormattedPrice();
  document.getElementsByTagName("title")[0].innerText =
    photographer.getPageName();
}

function displayArtistMedia(photographerName) {
  for (let jsonMedia of DataManager.getPhotographerMedia(photographerId)) {
    const media = new MediaFactory(jsonMedia, photographerName);
    document.getElementsByClassName("img-previews")[0].innerHTML +=
      media.getDOM();
  }
}

function displayErrorMessage(err) {
  const errMessage = document.createElement("p");
  errMessage.innerText = err;
  document.getElementById("main").appendChild(errMessage);
}

async function init() {
  await DataManager.loadJson("../../data/photographers.json");
  const photographer = new Photographer(
    DataManager.getPhotographer(photographerId)
  );
  displayPhotographer(photographer);
  displayArtistMedia(photographer.name);
}

for (let likeCount of document.getElementsByClassName("like-count")) {
  likeCount.addEventListener("click", () => {
    if (!likeCount.classList.contains("clicked")) {
      likeCount.innerText++;
    }
  });
}

init();
