"use_strict";

// header main elements
const main = document.querySelector("main");
const divMain = document.querySelector("main .photograph-header");
const header = document.createElement("header");
const ul = document.createElement("ul");
const liData = document.createElement("li");
const pName = document.createElement("p");
const pCountry = document.createElement("p");
const pTagline = document.createElement("p");
const liContact = document.createElement("li");
const contact = document.querySelector("button[class='contact_button']");
const liImg = document.createElement("li");
const img = document.createElement("img");

// functions 
function headerMain(header) {
    header.setAttribute("class","photograph-header");
}

// append ul element in header main
function ulHeader(header, ul) {
    ul.style.margin = "0";
    ul.style.padding = "0 40px";
    ul.style.display = "flex";
    ul.style.width = "100%";
    ul.style.justifyContent = "space-between";
    ul.style.alignItems = "center";
    header.appendChild(ul);
}

function liPhotographerData(liData, ul) {
    liData.style.display = "block";
    ul.appendChild(liData);
}

// displaying photographer name
function photographerName(pName, liData, name) {
    pName.style.margin = "10px 0";
    pName.textContent = name;
    pName.style.fontSize = "2.4rem";
    pName.style.color = "#D3573C";
    liData.appendChild(pName);
}

// displaying photographer country
function photographerCountry(pCountry, liData, city, country) {
    pCountry.style.margin = "10px 0";
    pCountry.style.color = "#D3573C";
    pCountry.style.fontSize = "1.2rem";
    pCountry.textContent = `${city}, ${country}`;
    liData.appendChild(pCountry);
}

// displaying photographer tagline
function photographerTagline(liData, pTagline, tagline) {
    pTagline.style.margin = "10px 0";
    pTagline.textContent = tagline;
    liData.appendChild(pTagline);
}

function contactButton(liContact, ul, contact) {
    liContact.style.display = "block";
    ul.appendChild(liContact).appendChild(contact);
}

// displaying photographer image
function photographerImg(ul, liImg, img, picture) {
    liImg.style.display = "block";
    ul.appendChild(liImg);
    img.setAttribute("src", picture);
    img.style.width = "150px";
    img.style.height = "150px";
    img.style.borderRadius = "50%";
    liImg.appendChild(img);
}

// displaying photographer data on header main
function photographerFactory(photographer) {
    const [{ name, portrait, city, country, tagline }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    headerMain(header);
    ulHeader(header, ul);
    liPhotographerData(liData, ul);
    photographerName(pName, liData, name);
    photographerCountry(pCountry, liData, city, country);
    photographerTagline(liData, pTagline, tagline);
    contactButton(liContact, ul, contact);
    photographerImg(ul, liImg, img, picture);
    
    divMain.replaceWith(header);
}

function sectionMedia(section) {
    section.style.margin = "60px 100px";
    section.setAttribute("id","media");
    main.appendChild(section);
}

function ulSectionMedia(section, ulMedia) {
    ulMedia.style.padding = "0";
    ulMedia.style.display = "flex";
    ulMedia.style.gap = "80px";
    ulMedia.style.flexWrap= "wrap";
    section.appendChild(ulMedia);
}

function liSectionMedia(liMedia, ulMedia) {
    liMedia.style.display = "block";
    ulMedia.appendChild(liMedia);
}

function linkSectionMedia(liMedia, linkMedia) {
    linkMedia.setAttribute("href","#");
    linkMedia.style.textDecoration = "none";
    liMedia.appendChild(linkMedia);
}

function figureSection(figureMedia, linkMedia) {
    figureMedia.style.margin = "0";
    linkMedia.appendChild(figureMedia);
}

function imgSection(imgMedia, figureMedia, picture) {
    imgMedia.setAttribute("src", picture);
    imgMedia.style.width = "300px";
    imgMedia.style.height = "300px";
    imgMedia.style.borderRadius = "5px";
    figureMedia.appendChild(imgMedia);
}

function figcaptionSection(figCaptionMedia, figureMedia) {
    figCaptionMedia.style.display = "flex";
    figCaptionMedia.style.justifyContent = "space-between";
    figCaptionMedia.style.alignItems = "center";
    figCaptionMedia.style.margin = "8px 0";
    figureMedia.appendChild(figCaptionMedia);
}

function figcaptionHeaderSection(figcaptionHeader, figCaptionMedia) {
    figcaptionHeader.style.height = "0";
    figCaptionMedia.appendChild(figcaptionHeader);
}

function titleMediaSection(title, titleMedia, figcaptionHeader) {
    titleMedia.textContent = title;
    titleMedia.style.color = "#901C1C";
    figcaptionHeader.appendChild(titleMedia);
}

function figureLikeSection(figureLike, figCaptionMedia) {
    figureLike.style.margin = "0";
    figureLike.style.color = "#901C1C";
    figCaptionMedia.appendChild(figureLike);
}

function likeMediaSection(likeMedia, figureLike, likes) {
    likeMedia.textContent = likes;
    likeMedia.style.paddingRight = "5px";
    figureLike.appendChild(likeMedia);
}

function iconMediaSection(figureLike, iconMedia) {
    iconMedia.setAttribute("class","fa-solid fa-heart");
    figureLike.appendChild(iconMedia);
}

// displaying photographerMedia data on section main
function photographerMediaFactory(photographerMedia) {

    const section = document.createElement("section");
    const ulMedia = document.createElement("ul");

    sectionMedia(section);
    ulSectionMedia(section, ulMedia);

    photographerMedia.forEach(media => {
        const { title, image, likes, date, price } = media;
        const picture = `assets/media/${image}`;

        // section main elements
        const liMedia = document.createElement("li");
        const linkMedia = document.createElement("a");
        const figureMedia = document.createElement("figure");
        const imgMedia = document.createElement("img");
        const figCaptionMedia = document.createElement("figcaption");
        const figcaptionHeader = document.createElement("header");
        const titleMedia = document.createElement("h3");
        const figureLike = document.createElement("figure");
        const likeMedia = document.createElement("span");
        const iconMedia = document.createElement("i");

        liSectionMedia(liMedia, ulMedia);
        linkSectionMedia(liMedia, linkMedia);
        figureSection(figureMedia, linkMedia);
        imgSection(imgMedia, figureMedia, picture);
        figcaptionSection(figCaptionMedia, figureMedia);
        figcaptionHeaderSection(figcaptionHeader, figCaptionMedia);
        titleMediaSection(title, titleMedia, figcaptionHeader);
        figureLikeSection(figureLike, figCaptionMedia);
        likeMediaSection(likeMedia, figureLike, likes);
        iconMediaSection(figureLike, iconMedia);
    });
}