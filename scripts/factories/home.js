"use_strict";

// Functions

function addLinkElt(id, name, aElt, articleElt) {
    aElt.setAttribute("href","photographer.html?name=" + name + "&id=" + id);
    aElt.style.textDecoration = "none";
    articleElt.appendChild(aElt);
}

function addFigureElt(figureElt, aElt) {
    figureElt.style.textAlign = "center"
    aElt.appendChild(figureElt);
}

function setPhotographerImg(name, picture, imgElt, figureElt) {
    imgElt.setAttribute("src", picture);
    imgElt.style.borderRadius = "50%";
    imgElt.setAttribute("alt", name);
    figureElt.appendChild(imgElt);
}

function setPhotographerName(name, nameElt, figureElt) {
    nameElt.style.margin = "15px 0 0 0";
    nameElt.textContent = name;
    nameElt.style.color = "#D3573C";
    figureElt.appendChild(nameElt);
}

function addFigCaptionElt(figureElt, figCaptionElt) {
    figureElt.appendChild(figCaptionElt);
}

// create h element that display photographer tagline
function setPhotographerCountry(city, country, countryElt, figCaptionElt) {
    countryElt.style.margin = "0 0";
    countryElt.textContent = `${city}, ${country}`;
    countryElt.style.color = "#D3573C";
    figCaptionElt.appendChild(countryElt);
}

// create p element that display photographer tabline
function setPhotographerTagline(tagline, taglineElt, figCaptionElt) {
    taglineElt.style.margin = "0 0";
    taglineElt.textContent = tagline;
    taglineElt.style.fontSize = "0.8rem";
    taglineElt.style.color = "#000";
    figCaptionElt.appendChild(taglineElt);
}

function setPhotographerPrice(price, priceElt, figCaptionElt) {
    priceElt.style.margin = "0 0";
    priceElt.textContent = `${price}/jour`;
    priceElt.style.fontSize = "0.8rem";
    priceElt.style.color = "#000";
    figCaptionElt.appendChild(priceElt);
}

// displaying photographers data
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
        setPhotographerTagline(tagline, taglineElt, figCaptionElt);
        setPhotographerCountry(city, country, countryElt, figCaptionElt);
        setPhotographerPrice(price, priceElt, figCaptionElt);
    
        return (articleElt);
    }

    return { id, name, picture, city, country, price, getUserCardDOM }
}