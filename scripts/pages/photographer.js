async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));
  console.log(await getPhotographer(id));
  console.log(await getMedia(id));

  displayData(await getPhotographer(id));
}

async function getPhotographer(id) {
  let photographer = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) =>
      data.photographers.find((photographer) => photographer.id === id)
    );

  return {photographer};
}

async function getMedia(id) {
  let media = await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => data.media.filter((media) => media.photographerId === id));

  return {media};
}


async function displayData({photographer}) {
  const photographerSection = document.querySelector(".photograph-header");

    const photographerModel = photographerCard(photographer);
    photographerSection.appendChild(photographerModel);
}

init();
