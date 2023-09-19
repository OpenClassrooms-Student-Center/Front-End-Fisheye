//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getPhotographerDetail() {
  const res = await fetch("./data/photographers.json");
  const data = await res.json();

  const mediaDetails = data.media.filter((media) => media.photographerId == id);

  const photographerDetails = data.photographers.filter(
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
  photographer.photographerDetails.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    photographerModel.getUserDetailDOM();
  });
}

async function displayMediaData(photographer) {
  const photographerFirstName = photographer.photographerDetails[0].name
    .split(" ")[0]
    .replace(/-/g, " ");
  let newMediaDetails = [];

  photographer.mediaDetails.forEach((media) => {
    mediaFactory(media, photographerFirstName).getMediaDOM();

    newMediaDetails.push({
      title: media.title,
      source: media.image || media.video,
      like: media.likes,
    });
  });

  lightboxFactory(newMediaDetails, photographerFirstName).addMediaDOM();
}

async function init() {
  const { photographer } = await getPhotographerDetail();
  displayData(photographer);
  displayMediaData(photographer);
}

init();
