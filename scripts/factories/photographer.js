"use_strict";

// Functions

function linkElement(name, a, article) {
    a.setAttribute("href","photographer.html?name=" + name);
    a.style.textDecoration = "none";
    article.appendChild(a);
}

function figureElement(figure, a) {
    figure.style.textAlign = "center"
    a.appendChild(figure);
}

function imgElement(name, picture, img, figure) {
    img.setAttribute("src", picture);
    img.style.borderRadius = "50%";
    img.setAttribute("alt", name);
    figure.appendChild(img);
}

function hDeuxElement(name, h2, figure) {
    h2.style.margin = "15px 0 0 0";
    h2.textContent = name;
    figure.appendChild(h2);
}

function figCaptionElement(figure, figCaption) {
    figure.appendChild(figCaption);
}

function hTroisElement(city, country, h3, figCaption) {
    h3.style.margin = "0 0";
    h3.textContent = `${city}, ${country}`;
    h3.style.color = "#D3573C";
    figCaption.appendChild(h3);
}

function pTaglineElement(tagline, pTagline, figCaption) {
    pTagline.style.margin = "0 0";
    pTagline.textContent = tagline;
    pTagline.style.color = "#000";
    figCaption.appendChild(pTagline);
}

function pPriceElement(price, pPrice, figCaption) {
    pPrice.style.margin = "0 0";
    pPrice.textContent = `${price}/jour`;
    pPrice.style.color = "#000";
    figCaption.appendChild(pPrice);
}

function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    
    const article = document.createElement("article");
    const a = document.createElement("a");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const figCaption = document.createElement("figCaption");
    const h3 = document.createElement("h3");
    const pTagline = document.createElement("p");
    const pPrice = document.createElement("p");

    function getUserCardDOM() {
    
        linkElement(name, a, article);
        figureElement(figure, a);
        imgElement(name, picture, img, figure);
        hDeuxElement(name, h2, figure);
        figCaptionElement(figure, figCaption);
        hTroisElement(city, country, h3, figCaption);
        pTaglineElement(tagline, pTagline, figCaption);
        pPriceElement(price, pPrice, figCaption);
    
        return (article);
    }

    return { id, name, picture, city, country, price, getUserCardDOM }
}