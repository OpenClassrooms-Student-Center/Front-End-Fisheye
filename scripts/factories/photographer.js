"use_strict";

// DOM elements
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

function photographerName(pName, liData, name) {
    pName.style.margin = "10px 0";
    pName.textContent = name;
    pName.style.fontSize = "2.4rem";
    pName.style.color = "#D3573C";
    liData.appendChild(pName);
}

function photographerCountry(pCountry, liData, city, country) {
    pCountry.style.margin = "10px 0";
    pCountry.style.color = "#D3573C";
    pCountry.style.fontSize = "1.2rem";
    pCountry.textContent = `${city}, ${country}`;
    liData.appendChild(pCountry);
}

function photographerTagline(liData, pTagline, tagline) {
    pTagline.style.margin = "10px 0";
    pTagline.textContent = tagline;
    liData.appendChild(pTagline);
}

function contactButton(liContact, ul, contact) {
    liContact.style.display = "block";
    ul.appendChild(liContact).appendChild(contact);
}

function photographerImg(ul, liImg, img, picture) {
    liImg.style.display = "block";
    ul.appendChild(liImg);
    img.setAttribute("src", picture);
    img.style.width = "150px";
    img.style.height = "150px";
    img.style.borderRadius = "50%";
    liImg.appendChild(img);
}

// creating header main
function photographerPageFactory(photographer) {
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