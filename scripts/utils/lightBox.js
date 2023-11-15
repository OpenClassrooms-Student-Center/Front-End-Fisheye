/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage modal media lightBox
*
/*********************************************************************************/
import { createPhotographerLightBox } from '../templates/photographerLightBoxTemplate.js';
/**
 * initialization of lightbox
 * @param {function} closeModal
 */
const initLightBox = (pictureNameRepository, media) => {
  console.log(media);
  createPhotographerLightBox(pictureNameRepository, media);
};

export { initLightBox };
