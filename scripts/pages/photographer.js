let urlParams = new URLSearchParams(window.location.search);
let id = parseInt(urlParams.get("id"));
const filter = document.querySelector("#filter");

filter.addEventListener("change", (event) => {
  changeFilter(event.target.value);
});

async function changeFilter(sort) {
  const photographer = await getPhotographer(id);
  let photographerFirstName = getFirstName(photographer?.photographer?.name);

  const medias = (await getMedia(id, sort)) || [];
  displayMedia(medias, photographerFirstName);
}

function displayLightbox() {
  lightbox.style.display = "block";
  
}


async function init() {
  const photographer = await getPhotographer(id);
  const media = await getMedia(id);

  let photographerFirstName = await photographer?.photographer?.name;

  displayPhotographer(photographer);
  displayMedia(media, getFirstName(photographerFirstName));

}

function getFirstName(photographerFirstName) {
  const firstName = photographerFirstName.split(" ")[0].replace("-", " ");
  return firstName;
}

async function getPhotographer(id) {
  let photographer = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) =>
      data.photographers.find((photographer) => photographer.id === id)
    );

  return { photographer };
}

async function getMedia(photographId, sort = "popularite") {
  let media = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) =>
      data.media.filter((media) => media.photographerId === photographId)
    );

  switch (sort) {
    case "popularite":
      media.sort((a, b) => b.likes - a.likes);
      break;
    case "Date":
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "Titre":
      media.sort((a, b) => (a.title > b.title ? 1 : -1));
      break;
  }

  return media;
}

async function displayPhotographer({ photographer }) {
  const photographInfoSection = document.querySelector(".photograph-infos");
  const photographPicture = document.querySelector(".photograph-picture");

  const photographerData = photographerHero(photographer);
  photographInfoSection.appendChild(photographerData.userInfos);
  photographPicture.appendChild(photographerData.userPicture);
}

async function displayMedia(medias, firstName) {
  if (!medias) {
    return;
  }

  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";

  medias.forEach((media) => {
    mediaSection.appendChild(mediaCard(media, firstName));
  });
}

init();
