"use_strict";

// Functions

function linkElement(id, name, a, article) {
    a.setAttribute("href","photographer.html?name=" + name + "&id=" + id);
    a.style.textDecoration = "none";
    article.appendChild(a);
}

function figureElement(figure, a) {
    figure.style.textAlign = "center"
    a.appendChild(figure);
}

function photographerImg(name, picture, img, figure) {
    img.setAttribute("src", picture);
    img.style.borderRadius = "50%";
    img.setAttribute("alt", name);
    figure.appendChild(img);
}

function photographerName(name, hName, figure) {
    hName.style.margin = "15px 0 0 0";
    hName.textContent = name;
    hName.style.color = "#D3573C";
    figure.appendChild(hName);
}

function figCaptionElement(figure, figCaption) {
    figure.appendChild(figCaption);
}

// create h element that display photographer tagline
function photographerCountry(city, country, hCountry, figCaption) {
    hCountry.style.margin = "0 0";
    hCountry.textContent = `${city}, ${country}`;
    hCountry.style.color = "#D3573C";
    figCaption.appendChild(hCountry);
}

// create p element that display photographer tabline
function photographerTagline(tagline, pTagline, figCaption) {
    pTagline.style.margin = "0 0";
    pTagline.textContent = tagline;
    pTagline.style.fontSize = "0.8rem";
    pTagline.style.color = "#000";
    figCaption.appendChild(pTagline);
}

function photographerPrice(price, pPrice, figCaption) {
    pPrice.style.margin = "0 0";
    pPrice.textContent = `${price}/jour`;
    pPrice.style.fontSize = "0.8rem";
    pPrice.style.color = "#000";
    figCaption.appendChild(pPrice);
}

// displaying photographers data
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    const article = document.createElement("article");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const hName = document.createElement("h2");
    const figCaption = document.createElement("figCaption");
    const hCountry = document.createElement("h3");
    const pTagline = document.createElement("p");
    const pPrice = document.createElement("p");

    function getUserCardDOM() {
        linkElement(id, name, a, article);
        figureElement(figure, a);
        photographerImg(name, picture, img, figure);
        photographerName(name, hName, figure);
        figCaptionElement(figure, figCaption);
        photographerCountry(city, country, hCountry, figCaption);
        photographerTagline(tagline, pTagline, figCaption);
        photographerPrice(price, pPrice, figCaption);
    
        return (article);
    }

    return { id, name, picture, city, country, price, getUserCardDOM }
}