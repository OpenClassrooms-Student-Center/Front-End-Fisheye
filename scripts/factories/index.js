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
    aElt.style.textDecoration = "none";
    articleElt.style.width = "max-content";
    articleElt.appendChild(aElt);
}

/**
 * 
 * @param {object} figureElt 
 * @param {object} aElt 
 */
function addFigureElt(figureElt, aElt) {
    figureElt.style.textAlign = "center"
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
    imgElt.style.borderRadius = "50%";
    imgElt.style.objectFit = "cover";
    imgElt.setAttribute("alt", name);
    figureElt.appendChild(imgElt);
}

/**
 * 
 * @param {string} name 
 * @param {object} nameElt 
 * @param {object} figureElt 
 */
function setPhotographerName(name, nameElt, figureElt) {
    nameElt.style.margin = "15px 0 10px 0";
    nameElt.textContent = name;
    nameElt.style.color = "#D3573C";
    figureElt.appendChild(nameElt);
}

/**
 * 
 * @param {object} figureElt 
 * @param {object} figCaptionElt 
 */
function addFigCaptionElt(figureElt, figCaptionElt) {
    figCaptionElt.style.lineHeight = "1.3rem";
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
    countryElt.style.margin = "0 0";
    countryElt.textContent = `${city}, ${country}`;
    countryElt.style.color = "#901C1C";
    figCaptionElt.appendChild(countryElt);
}

/**
 * 
 * @param {string} tagline 
 * @param {object} taglineElt 
 * @param {object} figCaptionElt 
 */
function setPhotographerTagline(tagline, taglineElt, figCaptionElt) {
    taglineElt.style.margin = "0 0";
    taglineElt.textContent = tagline;
    taglineElt.style.fontSize = "0.8rem";
    taglineElt.style.color = "#000";
    figCaptionElt.appendChild(taglineElt);
}

/**
 * 
 * @param {number} price 
 * @param {object} priceElt 
 * @param {object} figCaptionElt 
 */
function setPhotographerPrice(price, priceElt, figCaptionElt) {
    priceElt.style.margin = "0 0";
    priceElt.textContent = `${price}/jour`;
    priceElt.style.fontSize = "0.8rem";
    priceElt.style.color = "#525252";
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