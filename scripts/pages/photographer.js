const currentUrl = new URL(window.location.href);
const photographerId = parseInt(currentUrl.searchParams.get("id"));
let photographerName = "";

async function displayPhotographer() {
  const photographer = new Photographer(await getPhotographer());
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

async function getPhotographer() {
  try {
    const jsonData = await (
      await fetch("../../data/photographers.json")
    ).json();
    const jsonPhotographer = jsonData.photographers.find(
      (photographer) => photographer.id === photographerId
    );
    await setPhotographerName(jsonPhotographer.name);
    return jsonPhotographer;
  } catch (err) {
    displayErrorMessage(err);
  }
}

async function setPhotographerName(name) {
  photographerName = name;
}

async function displayArtistMedia() {
  for (let media of await getArtistMedia()) {
    const photo = new Photo(media);
    document.getElementsByClassName("img-previews")[0].innerHTML +=
      photo.getPhotoThumbnailDOM(photographerName);
  }
}

async function getArtistMedia() {
  try {
    const jsonData = await (
      await fetch("../../data/photographers.json")
    ).json();
    console.log(
      jsonData.media.filter((media) => media.photographerId === photographerId)
    );
    return jsonData.media.filter(
      (media) => media.photographerId === photographerId
    );
  } catch (err) {
    displayErrorMessage(err);
  }
}

function displayErrorMessage(err) {
  const errMessage = document.createElement("p");
  errMessage.innerText = err;
  document.getElementById("main").appendChild(errMessage);
}

async function init() {
  await displayPhotographer();
  displayArtistMedia();
}

init();
