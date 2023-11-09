/* eslint-disable no-unused-vars */

/**
 * controller of photographer page
 */
import { DbPhotographers } from '../db/DbPhotographers.js';
import { DbMedia } from '../db/DbMedia.js';
import { PhotographerTemplate } from '../templates/photographerTemplate.js';
/**
 * Executed when home page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data
 * @param {array} photographer
 */
function displayPhotographerProfile(photographer) {
  try {
    const photographerMain = document.querySelector('.photographer__main');
    const photographerHeader = PhotographerTemplate(photographer);
    const photographerHeaderDOM =
      photographerHeader.createPhotographerProfile(photographer);
    photographerMain.insertBefore(
      photographerHeaderDOM,
      photographerMain.firstChild
    );
  } catch (error) {
    console.log(error.message);
  }
}
/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data
 * @param {array} photographer
 */
function displayPhotographerGallery(photographer, medias) {
  try {
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );
    medias.forEach((media) => {
      const mediaArticle = PhotographerTemplate(photographer);
      const mediaArticleDOM = mediaArticle.createMediaCard(media);
      photographerGallery.appendChild(mediaArticleDOM);
    });
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Function called up on loading, retrieves photographer data according to id
 */
async function init() {
  try {
    let params = new URL(document.location).searchParams;
    const idPhotographer = params.get('id');
    const datasPhotographer = DbPhotographers();
    const photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    // if id is empty or doesn't exist in database --> home redirection
    if (photographer == null) {
      window.location.href = '../index.html';
    } else {
      const datasMedia = DbMedia();
      const medias = await datasMedia.getMediasByPhotographerId(idPhotographer);
      console.log(medias);
      displayPhotographerProfile(photographer);
      displayPhotographerGallery(photographer, medias);
    }
  } catch (error) {
    console.log(error.message);
  }
}
