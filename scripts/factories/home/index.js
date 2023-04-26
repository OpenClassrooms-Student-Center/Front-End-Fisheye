"use_strict";

/**
 * 
 * @param {number} id 
 * @param {string} name 
 * @param {object} aElt 
 * @param {object} articleElt 
 */
function addLinkElt(id, name, aElt, articleElt) {
    aElt.setAttribute("href","photographer.html?name=" + name + "&id=" + id);
    articleElt.setAttribute("aria-description","cette carte présente" + name);
    articleElt.appendChild(aElt);
}

/**
 * 
 * @param {object} figureElt 
 * @param {object} aElt 
 */
function addFigureElt(figureElt, aElt) {
    aElt.appendChild(figureElt);
}

/**
 * 
 * @param {string} name 
 * @param {string} picture 
 * @param {object} imgElt 
 * @param {object} figureElt 
 */
function setPhotographerImg(name, picture, imgElt, figureElt) {
    imgElt.setAttribute("src", picture);
    imgElt.setAttribute("alt", name);
    imgElt.setAttribute("role","none");
    figureElt.appendChild(imgElt);
}

/**
 * 
 * @param {string} name 
 * @param {object} nameElt 
 * @param {object} figureElt 
 */
function setPhotographerName(name, nameElt, figureElt) {
    nameElt.textContent = name;
    nameElt.setAttribute("aria-hidden","true");
    figureElt.appendChild(nameElt);
}

/**
 * 
 * @param {object} figureElt 
 * @param {object} figCaptionElt 
 */
function addFigCaptionElt(figureElt, figCaptionElt) {
    figureElt.setAttribute("role","none");
    figCaptionElt.setAttribute("role","none");
    figureElt.appendChild(figCaptionElt);
}

/**
 * 
 * @param {string} city 
 * @param {string} country 
 * @param {object} countryElt 
 * @param {object} figCaptionElt 
 */
function setPhotographerCountry(city, country, countryElt, figCaptionElt) {
    countryElt.setAttribute("aria-label","venant de" + city +"," + country);
    countryElt.setAttribute("id","photographer-country");
    countryElt.textContent = `${city}, ${country}`;
    figCaptionElt.appendChild(countryElt);
}

/**
 * 
 * @param {string} tagline 
 * @param {object} taglineElt 
 * @param {object} figCaptionElt 
 */
function setPhotographerTagline(tagline, taglineElt, figCaptionElt) {
    taglineElt.textContent = tagline;
    figCaptionElt.appendChild(taglineElt);
}

/**
 * 
 * @param {number} price 
 * @param {object} priceElt 
 * @param {object} figCaptionElt 
 */
function setPhotographerPrice(price, priceElt, figCaptionElt) {
    priceElt.textContent = `${price}/jour`;
    figCaptionElt.appendChild(priceElt);
}

/**
 * 
 * @param {object} data 
 * @returns {object}
 */
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    const articleElt = document.createElement("article");
    const aElt = document.createElement("a");
    const figureElt = document.createElement("figure");
    const imgElt = document.createElement("img");
    const nameElt = document.createElement("h2");
    const figCaptionElt = document.createElement("figCaption");
    const countryElt = document.createElement("h3");
    const taglineElt = document.createElement("p");
    const priceElt = document.createElement("p");

    function getUserCardDOM() {
        addLinkElt(id, name, aElt, articleElt);
        addFigureElt(figureElt, aElt);
        setPhotographerImg(name, picture, imgElt, figureElt);
        setPhotographerName(name, nameElt, figureElt);
        addFigCaptionElt(figureElt, figCaptionElt);
        setPhotographerCountry(city, country, countryElt, figCaptionElt);
        setPhotographerTagline(tagline, taglineElt, figCaptionElt);
        setPhotographerPrice(price, priceElt, figCaptionElt);
    
        return (articleElt);
    }

    return { getUserCardDOM }
}