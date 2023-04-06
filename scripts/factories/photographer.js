"use_strict";

// header main elements
const mainElt = document.querySelector("main");
const ulHeaderElt = document.querySelector(".photograph_header ul");
const liPhotographerDataElt = document.createElement("li");
const liContactElt = document.createElement("li");
const liImgElt = document.createElement("li");
const nameElt = document.createElement("p");
const countryElt = document.createElement("p");
const taglineElt = document.createElement("p");
const buttonElt = document.querySelector("button[class='contact_button']");
const imgElt = document.createElement("img");

// header section content
function addLiPhotographerData(liPhotographerDataElt, ulHeaderElt) {
    liPhotographerDataElt.style.display = "block";
    ulHeaderElt.appendChild(liPhotographerDataElt);
}

function setPhotographerName(nameElt, liPhotographerDataElt, name) {
    nameElt.style.margin = "10px 0";
    nameElt.textContent = name;
    nameElt.style.fontSize = "2.4rem";
    nameElt.style.color = "#D3573C";
    liPhotographerDataElt.appendChild(nameElt);
}

function setPhotographerCountry(countryElt, liPhotographerDataElt, city, country) {
    countryElt.style.margin = "10px 0";
    countryElt.style.color = "#901C1C";
    countryElt.style.fontSize = "1.2rem";
    countryElt.textContent = `${city}, ${country}`;
    liPhotographerDataElt.appendChild(countryElt);
}

function setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline) {
    taglineElt.style.margin = "10px 0";
    taglineElt.style.color = "#525252";
    taglineElt.textContent = tagline;
    liPhotographerDataElt.appendChild(taglineElt);
}

function addContactButton(liContactElt, ulHeaderElt, buttonElt) {
    liContactElt.style.display = "block";
    ulHeaderElt.appendChild(liContactElt).appendChild(buttonElt);
}

function setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture) {
    liImgElt.style.display = "block";
    imgElt.setAttribute("src", picture);
    imgElt.style.width = "150px";
    imgElt.style.height = "150px";
    imgElt.style.borderRadius = "50%";
    ulHeaderElt.appendChild(liImgElt).appendChild(imgElt);
}

// displaying photographer data on header main
function photographerContactFactory(photographer) {
    const [{ name, portrait, city, country, tagline }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    addLiPhotographerData(liPhotographerDataElt, ulHeaderElt);
    setPhotographerName(nameElt, liPhotographerDataElt, name);
    setPhotographerCountry(countryElt, liPhotographerDataElt, city, country);
    setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline);
    addContactButton(liContactElt, ulHeaderElt, buttonElt);
    setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture);
}

// media section functions 
function addLiMedia(liMediaElt) {
    liMediaElt.style.display = "block";
}

function addFigureMedia(figureMediaElt, liMediaElt) {
    figureMediaElt.style.margin = "0";
    liMediaElt.appendChild(figureMediaElt);
}

function addLinkMedia(figureMediaElt, linkMediaElt) {
    linkMediaElt.setAttribute("href","#");
    linkMediaElt.style.textDecoration = "none";
    figureMediaElt.appendChild(linkMediaElt);
}

function setImgMedia(imgMediaElt, linkMediaElt, picture) {
    imgMediaElt.setAttribute("src", picture);
    imgMediaElt.style.width = "400px";
    imgMediaElt.style.height = "400px";
    imgMediaElt.style.borderRadius = "5px";
    linkMediaElt.appendChild(imgMediaElt);
    
}

function setVideoMedia(videoMediaElt, linkMediaElt, srcVideo) {
    const srcElt = document.createElement("source");
    srcElt.setAttribute("src", srcVideo)
    srcElt.setAttribute("type","video/mp4");
    videoMediaElt.style.width = "400px";
    videoMediaElt.style.height = "400px";
    videoMediaElt.setAttribute("controls","controls");
    
    videoMediaElt.appendChild(srcElt);
    linkMediaElt.appendChild(videoMediaElt);
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
    iMediaElt.style.cursor = "pointer";
    figureLikeElt.appendChild(iMediaElt);
}

// displaying photographerMedia data on section main
function photographerMediaFactory(media) {
    const { title, image, video, likes } = media;
    const picture = `assets/media/${image}`;
    const srcVideo = `assets/media/${video}`;
    
    // section media elements
    const liMediaElt = document.createElement("li");
    const figureMediaElt = document.createElement("figure");
    const linkMediaElt = document.createElement("a");
    const imgMediaElt = document.createElement("img");
    const videoMediaElt = document.createElement("video");
    const figCaptionMediaElt = document.createElement("figcaption");
    const figcaptionHeaderElt = document.createElement("header");
    const titleElt = document.createElement("h3");
    const figureLikeElt = document.createElement("figure");
    const spanLikeElt = document.createElement("span");
    const iMediaElt = document.createElement("i");

    function getMediaCardDOM() {
        image ? setImgMedia(imgMediaElt, linkMediaElt, picture) : setVideoMedia(videoMediaElt, linkMediaElt, srcVideo);
        addLiMedia(liMediaElt);
        addFigureMedia(figureMediaElt, liMediaElt);
        addLinkMedia(figureMediaElt, linkMediaElt);
        addFigcaptionMedia(figCaptionMediaElt, figureMediaElt);
        addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt);
        setTitleMedia(title, titleElt, figcaptionHeaderElt);
        addLikeMedia(figureLikeElt, figCaptionMediaElt);
        setLikesMedia(spanLikeElt, figureLikeElt, likes);
        addIconLikeMedia(figureLikeElt, iMediaElt);

        return (liMediaElt);
    }

    return { getMediaCardDOM };
}

// displaying total number likes + price per day
function photographerPriceAndTotalLikesFactory(photographer, totalLikes) {
    const [{ price }] = photographer;
    
    const totalLikesElt = document.querySelector(".total-likes");
    const priceAndLikesElt = document.querySelector(".price-and-likes");
    const totalElt = document.createElement("b");
    const heartElt = document.createElement("i");
    const priceElt = document.createElement("b");

    priceAndLikesElt.appendChild(totalLikesElt);
    totalElt.textContent = totalLikes;
    totalLikesElt.appendChild(totalElt);
    heartElt.className = "fa-solid fa-heart";
    totalLikesElt.appendChild(heartElt);
    priceElt.textContent = `${price}€ / jour`;
    priceAndLikesElt.appendChild(priceElt);
}


