import { URL } from "../../constants/index.js";
import { PhotographerProfilHeader } from "../components/photographerProfile/index.js";
import { getData } from "../services/getData.js";

const data = await getData(URL);
const id = parseInt(new URLSearchParams(location.search).get("photographer"));
console.log("ID => ", id);

export const PhotographerProfil = async (data, id) => {
  const { photographers, media } = data;

  const currentPhotographer = photographers.find(
    (photographer) => photographer.id === id
  );

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
