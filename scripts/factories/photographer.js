"use_strict";

function photographerPageFactory(photographer) {
    const [{ id, name, portrait, city, country, tagline, price }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    const divMain = document.querySelector("main .photograph-header");
    const header = document.createElement("header");
    header.setAttribute("class","photograph-header");

    const ulHeader = document.createElement("ul");
    ulHeader.style.margin = "0";
    ulHeader.style.padding = "0 40px";
    ulHeader.style.display = "flex";
    ulHeader.style.width = "100%";
    ulHeader.style.justifyContent = "space-between";
    ulHeader.style.alignItems = "center";
    header.appendChild(ulHeader);

    const liPhotographerData = document.createElement("li");
    liPhotographerData.style.display = "block";
    ulHeader.appendChild(liPhotographerData);

    const photographerName = document.createElement("h2");
    photographerName.style.margin = "10px 0";
    photographerName.style.color = "#D3573C";
    photographerName.textContent = name;
    liPhotographerData.appendChild(photographerName);

    const photographerCountry = document.createElement("p");
    photographerCountry.style.margin = "10px 0";
    photographerCountry.style.color = "#D3573C";
    photographerCountry.style.fontSize = "1.2rem";
    photographerCountry.textContent = `${city}, ${country}`;
    liPhotographerData.appendChild(photographerCountry);

    const photographerTagline = document.createElement("p");
    photographerTagline.style.margin = "10px 0";
    photographerTagline.textContent = tagline;
    liPhotographerData.appendChild(photographerTagline);

    const liContactButton = document.createElement("li");
    liContactButton.style.display = "block";
    ulHeader.appendChild(liContactButton);
    const contactButton = document.querySelector("button[class='contact_button']");
    liContactButton.appendChild(contactButton);

    const liImg = document.createElement("li");
    liImg.style.display = "block";
    ulHeader.appendChild(liImg);
    const photographerImg = document.createElement("img");
    photographerImg.setAttribute("src", picture);
    photographerImg.style.width = "150px";
    photographerImg.style.height = "150px";
    photographerImg.style.borderRadius = "50%";

    liImg.appendChild(photographerImg);
    
    divMain.replaceWith(header);
}