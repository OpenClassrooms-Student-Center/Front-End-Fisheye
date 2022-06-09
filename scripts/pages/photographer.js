import { URL } from "../../constants/index.js";
import { PhotographerProfilHeader } from "../components/photographerProfile/index.js";
import { MediasFactory } from "../factories/photographerMediaFactory.js";
import { getData } from "../services/getData.js";

const data = await getData(URL);
const id = parseInt(new URLSearchParams(location.search).get("photographer"));
const { photographers } = data;

const currentPhotographer = photographers.find(
  (photographer) => photographer.id === id
);
console.log("ID => ", id);

export const PhotographerProfil = async (data, id) => {
  console.log("CurrentPhotgrapher => ", currentPhotographer);
  const sectionHeaderPhotographer = document.querySelector(
    ".section-photographe"
  );
  const photographeCardHeader = new PhotographerProfilHeader(
    currentPhotographer
  );

  sectionHeaderPhotographer.innerHTML =
    photographeCardHeader.createUserProfil();

  console.log(" headerCard => ", photographeCardHeader.createUserProfil());
};

PhotographerProfil(data, id);

const generatePhotographerMedias = (currentMedias, currentPhotographer) => {
  const portfolioBlock = document.querySelector(".portfolio");
  portfolioBlock.innerHTML = "";
  currentMedias.forEach((media) => {
    const photoCardDOM = new MediasFactory(media, currentPhotographer.name);
    portfolioBlock.appendChild(photoCardDOM.buildMediaCard());
  });
};

const initMedias = async () => {
  const { media: medias } = data;
  console.log("medias :::::> ", medias);

  const currentMedias = medias.filter((media) => media.photographerId === id);
  console.log("currentMedias ::> ", currentMedias);
  generatePhotographerMedias(currentMedias, currentPhotographer);
};

initMedias();
