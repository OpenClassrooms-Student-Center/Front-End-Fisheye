"use_strict";

// DOM elements
const mainElt = document.querySelector("main");
const ulHeaderElt = document.querySelector(".photograph-header ul");
const liPhotographerDataElt = document.createElement("li");
const liContactElt = document.createElement("li");
const liImgElt = document.createElement("li");
const nameElt = document.createElement("h1");
const countryElt = document.createElement("h2");
const taglineElt = document.createElement("p");
const buttonElt = document.querySelector("button[class='contact-button']");
const imgElt = document.createElement("img");

/**
 * 
 * @param {object} liPhotographerDataElt 
 * @param {object} ulHeaderElt
 */
function addLiPhotographerData(liPhotographerDataElt, ulHeaderElt) {
    ulHeaderElt.appendChild(liPhotographerDataElt);
}

/**
 * 
 * @param {object} nameElt 
 * @param {object} liPhotographerDataElt 
 * @param {string} name
 */
function setPhotographerName(nameElt, liPhotographerDataElt, name) {
    nameElt.textContent = name;
    liPhotographerDataElt.appendChild(nameElt);
}

/**
 * 
 * @param {object} countryElt 
 * @param {object} liPhotographerDataElt 
 * @param {string} city 
 * @param {string} country
 */
function setPhotographerCountry(countryElt, liPhotographerDataElt, city, country) {
    countryElt.textContent = `${city}, ${country}`;
    liPhotographerDataElt.appendChild(countryElt);
}

/**
 * 
 * @param {object} liPhotographerDataElt 
 * @param {object} taglineElt 
 * @param {string} tagline 
 */
function setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline) {
    taglineElt.textContent = tagline;
    liPhotographerDataElt.appendChild(taglineElt);
}

/**
 * 
 * @param {object} liContactElt 
 * @param {object} ulHeaderElt 
 * @param {object} buttonElt 
 */
function addContactButton(liContactElt, ulHeaderElt, buttonElt) {
    ulHeaderElt.appendChild(liContactElt).appendChild(buttonElt);
}

/**
 * 
 * @param {object} ulHeaderElt 
 * @param {object} liImgElt 
 * @param {object} imgElt 
 * @param {string} picture
 */
function setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture, name) {
    imgElt.setAttribute("src", picture);
    imgElt.setAttribute("alt", name);
    ulHeaderElt.appendChild(liImgElt).appendChild(imgElt);
}

/**
 * displaying photographer data on header main
 * 
 * @param {string} photographer 
 */
function photographerContactFactory(photographer) {
    const [{ name, portrait, city, country, tagline }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    addLiPhotographerData(liPhotographerDataElt, ulHeaderElt);
    setPhotographerName(nameElt, liPhotographerDataElt, name);
    setPhotographerCountry(countryElt, liPhotographerDataElt, city, country);
    setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline);
    addContactButton(liContactElt, ulHeaderElt, buttonElt);
    setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture, name);
}