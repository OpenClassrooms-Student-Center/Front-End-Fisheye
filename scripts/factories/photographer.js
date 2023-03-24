"use_strict";

// header main elements
const mainElt = document.querySelector("main");
const divMainElt = document.querySelector("main .photograph-header");
const headerMainElt = document.createElement("header");
const ulHeaderElt = document.createElement("ul");
const liContactElt = document.createElement("li");
const liPhotographerDataElt = document.createElement("li");
const liImgElt = document.createElement("li");
const nameElt = document.createElement("p");
const countryElt = document.createElement("p");
const taglineElt = document.createElement("p");
const buttonElt = document.querySelector("button[class='contact_button']");
const imgElt = document.createElement("img");

// header functions 
function addAttributeToHeaderMain(headerMainElt) {
    headerMainElt.className = "photograph-header";
}

// append ul element in header main
function addUlHeader(headerMainElt, ulHeaderElt) {
    ulHeaderElt.style.margin = "0";
    ulHeaderElt.style.padding = "0 40px";
    ulHeaderElt.style.display = "flex";
    ulHeaderElt.style.width = "100%";
    ulHeaderElt.style.justifyContent = "space-between";
    ulHeaderElt.style.alignItems = "center";
    headerMainElt.appendChild(ulHeaderElt);
}

function addLiPhotographerData(liPhotographerDataElt, ulHeaderElt) {
    liPhotographerDataElt.style.display = "block";
    ulHeaderElt.appendChild(liPhotographerDataElt);
}

// displaying photographer name
function setPhotographerName(nameElt, liPhotographerDataElt, name) {
    nameElt.style.margin = "10px 0";
    nameElt.textContent = name;
    nameElt.style.fontSize = "2.4rem";
    nameElt.style.color = "#D3573C";
    liPhotographerDataElt.appendChild(nameElt);
}

// displaying photographer country
function setPhotographerCountry(countryElt, liPhotographerDataElt, city, country) {
    countryElt.style.margin = "10px 0";
    countryElt.style.color = "#D3573C";
    countryElt.style.fontSize = "1.2rem";
    countryElt.textContent = `${city}, ${country}`;
    liPhotographerDataElt.appendChild(countryElt);
}

// displaying photographer tagline
function setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline) {
    taglineElt.style.margin = "10px 0";
    taglineElt.textContent = tagline;
    liPhotographerDataElt.appendChild(taglineElt);
}

function addContactButton(liContactElt, ulHeaderElt, buttonElt) {
    liContactElt.style.display = "block";
    ulHeaderElt.appendChild(liContactElt).appendChild(buttonElt);
}

// displaying photographer image
function setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture) {
    liImgElt.style.display = "block";
    imgElt.setAttribute("src", picture);
    imgElt.style.width = "150px";
    imgElt.style.height = "150px";
    imgElt.style.borderRadius = "50%";
    ulHeaderElt.appendChild(liImgElt).appendChild(imgElt);
}

// displaying photographer data on header main
function photographerFactory(photographer) {
    const [{ name, portrait, city, country, tagline }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    divMainElt.replaceWith(headerMainElt);
    addAttributeToHeaderMain(headerMainElt);
    addUlHeader(headerMainElt, ulHeaderElt);
    addLiPhotographerData(liPhotographerDataElt, ulHeaderElt);
    setPhotographerName(nameElt, liPhotographerDataElt, name);
    setPhotographerCountry(countryElt, liPhotographerDataElt, city, country);
    setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline);
    addContactButton(liContactElt, ulHeaderElt, buttonElt);
    setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture);
}

// media section functions 

function addSectionMedia(section) {
    section.setAttribute("id","media");
    section.style.margin = "60px 100px";
    section.style.maxWidth = "100%"
    mainElt.appendChild(section);
}

function addUlMedia(section, ulMediaElt) {
    ulMediaElt.style.padding = "0";
    ulMediaElt.style.display = "flex";
    ulMediaElt.style.justifyContent = "space-between";
    ulMediaElt.style.flexWrap= "wrap";
    section.appendChild(ulMediaElt);
}

function addLiMedia(liMediaElt, ulMediaElt) {
    liMediaElt.style.display = "block";
    liMediaElt.style.marginBottom = "30px";
    ulMediaElt.appendChild(liMediaElt);
}

function addLinkMedia(liMediaElt, linkMediaElt) {
    linkMediaElt.setAttribute("href","#");
    linkMediaElt.style.textDecoration = "none";
    liMediaElt.appendChild(linkMediaElt);
}

function addFigureMedia(figureMediaElt, linkMediaElt) {
    figureMediaElt.style.margin = "0";
    linkMediaElt.appendChild(figureMediaElt);
}

function setImgMedia(imgMediaElt, figureMediaElt, picture) {
    imgMediaElt.setAttribute("src", picture);
    imgMediaElt.style.width = "360px";
    imgMediaElt.style.height = "360px";
    imgMediaElt.style.borderRadius = "5px";
    figureMediaElt.appendChild(imgMediaElt);
}

function addFigcaptionMedia(figCaptionMediaElt, figureMediaElt) {
    figCaptionMediaElt.style.display = "flex";
    figCaptionMediaElt.style.justifyContent = "space-between";
    figCaptionMediaElt.style.alignItems = "center";
    figCaptionMediaElt.style.margin = "8px 0";
    figureMediaElt.appendChild(figCaptionMediaElt);
}

function addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt) {
    figcaptionHeaderElt.style.height = "0";
    figCaptionMediaElt.appendChild(figcaptionHeaderElt);
}

function setTitleMedia(title, titleElt, figcaptionHeaderElt) {
    titleElt.textContent = title;
    titleElt.style.color = "#901C1C";
    figcaptionHeaderElt.appendChild(titleElt);
}

function addLikeMedia(figureLikeElt, figCaptionMediaElt) {
    figureLikeElt.style.margin = "0";
    figureLikeElt.style.color = "#901C1C";
    figCaptionMediaElt.appendChild(figureLikeElt);
}

function setLikesMedia(spanLikeElt, figureLikeElt, likes) {
    spanLikeElt.textContent = likes;
    spanLikeElt.style.paddingRight = "5px";
    figureLikeElt.appendChild(spanLikeElt);
}

function addIconLikeMedia(figureLikeElt, iMediaElt) {
    iMediaElt.className = "fa-solid fa-heart";
    figureLikeElt.appendChild(iMediaElt);
}

// displaying photographerMedia data on section main
function photographerMediaFactory(photographerMedia) {

    const sectionElt = document.createElement("section");
    const ulMediaElt = document.createElement("ul");

    addSectionMedia(sectionElt);
    addUlMedia(sectionElt, ulMediaElt);

    photographerMedia.forEach(media => {
        const { title, image, likes, date, price } = media;
        const picture = `assets/media/${image}`;

        // section main elements
        const liMediaElt = document.createElement("li");
        const linkMediaElt = document.createElement("a");
        const figureMediaElt = document.createElement("figure");
        const imgMediaElt = document.createElement("img");
        const figCaptionMediaElt = document.createElement("figcaption");
        const figcaptionHeaderElt = document.createElement("header");
        const titleElt = document.createElement("h3");
        const figureLikeElt = document.createElement("figure");
        const spanLikeElt = document.createElement("span");
        const iMediaElt = document.createElement("i");

        addLiMedia(liMediaElt, ulMediaElt);
        addLinkMedia(liMediaElt, linkMediaElt);
        addFigureMedia(figureMediaElt, linkMediaElt);
        setImgMedia(imgMediaElt, figureMediaElt, picture);
        addFigcaptionMedia(figCaptionMediaElt, figureMediaElt);
        addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt);
        setTitleMedia(title, titleElt, figcaptionHeaderElt);
        addLikeMedia(figureLikeElt, figCaptionMediaElt);
        setLikesMedia(spanLikeElt, figureLikeElt, likes);
        addIconLikeMedia(figureLikeElt, iMediaElt);
    });
}