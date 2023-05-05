import {mediaFactory} from "../factories/mediaFactory.js";
// import {Lightbox} from "../factories/lightboxFactory.js";
import {PhotographersModel} from "../models/photographersModel.js";

export const parentDOM = document.querySelector("main");
export const urlPhotographerId = (new URL(window.location)).searchParams.get("id");

const photographersModel = new PhotographersModel();
export const photographer = await photographersModel.getPhotographerById(urlPhotographerId);

export const mediaPhotographer = await photographersModel.getMediaForOnePhotographer(urlPhotographerId);

console.log("photographer media : " + mediaPhotographer);
const mediaDataContainer = document.querySelector(".photographer-media-container")
const filterContainer = document.querySelector(".photographer-filter-container")
const bannerContainer = document.querySelector(".photographer-banner-container")

async function init() {
  console.log("photographer : " + photographer);
  await bannerData(photographer);
  await likePriceData(photographer);
  formData(photographer);
  await mediaData(mediaPhotographer);
  await mediaSort(mediaPhotographer);

  // Lightbox.init()
}

await init();

// FONCTION BANNER PHOTOGRAPHE
async function bannerData(data) {
  bannerContainer.appendChild(photographerFactory(data).getUserBannerDOM());
}

// FONCTION SORT MEDIA
async function mediaSort(data) {
  filterContainer.appendChild(mediaFactory(data).getUserMediaSortDOM());
}

// FONCTION GALERIE MEDIAS PHOTOGRAPHE
export async function mediaData(data) {
  mediaDataContainer.innerHTML = "";
  data.forEach((media) => {
    mediaDataContainer.appendChild(mediaFactory(media).getUserMediaDOM());
  });
}

// FONCTION ENCARD PRIX PHOTOGRAPHE
async function likePriceData(data) {
  parentDOM.appendChild(mediaFactory(data).getLikesPrice());
}

// FONCTION MODAL FORM
function formData() {
  parentDOM.appendChild(contactForm(photographer).getContactFormDOM());
}

