//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getPhotographerDetail() {
  const res = await fetch("./data/photographers.json");
  const data = await res.json();

  const photographer = {
    photographers: [...data.photographers],
    medias: [...data.media],
  };

  const mediaDetails = photographer.medias.filter(
    (media) => media.photographerId == id
  );

  const photographerDetails = photographer.photographers.filter(
    (photographer) => photographer.id == id
  );

  return {
    photographer: {
      photographerDetails: [...photographerDetails],
      mediaDetails: [...mediaDetails],
    },
  };
}

async function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");

  photographer.photographerDetails.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getUserDetailDOM();
    photographersSection.appendChild(userHeaderDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographer } = await getPhotographerDetail();
  displayData(photographer);
}

init();
