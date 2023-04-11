"use_strict";

// header main elements
const mainElt = document.querySelector("main");
const ulHeaderElt = document.querySelector(".photograph-header ul");
const liPhotographerDataElt = document.createElement("li");
const liContactElt = document.createElement("li");
const liImgElt = document.createElement("li");
const nameElt = document.createElement("p");
const countryElt = document.createElement("p");
const taglineElt = document.createElement("p");
const buttonElt = document.querySelector("button[class='contact-button']");
const imgElt = document.createElement("img");

/**
 * header section content
 * 
 * @param {object} liPhotographerDataElt 
 * @param {object} ulHeaderElt
 */
function addLiPhotographerData(liPhotographerDataElt, ulHeaderElt) {
    liPhotographerDataElt.style.display = "block";
    ulHeaderElt.appendChild(liPhotographerDataElt);
}

/**
 * 
 * @param {object} nameElt 
 * @param {object} liPhotographerDataElt 
 * @param {string} name
 */
function setPhotographerName(nameElt, liPhotographerDataElt, name) {
    nameElt.style.margin = "10px 0";
    nameElt.textContent = name;
    nameElt.style.fontSize = "2.4rem";
    nameElt.style.color = "#D3573C";
    liPhotographerDataElt.appendChild(nameElt);
}

/**
 * 
 * @param {object} countryElt 
 * @param {object} liPhotographerDataElt 
 * @param {string} city 
 * @param {string} country
 */
function setPhotographerCountry(countryElt, liPhotographerDataElt, city, country) {
    countryElt.style.margin = "10px 0";
    countryElt.style.color = "#901C1C";
    countryElt.style.fontSize = "1.2rem";
    countryElt.textContent = `${city}, ${country}`;
    liPhotographerDataElt.appendChild(countryElt);
}

/**
 * 
 * @param {object} liPhotographerDataElt 
 * @param {object} taglineElt 
 * @param {string} tagline 
 */
function setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline) {
    taglineElt.style.margin = "10px 0";
    taglineElt.style.color = "#525252";
    taglineElt.textContent = tagline;
    liPhotographerDataElt.appendChild(taglineElt);
}

/**
 * 
 * @param {object} liContactElt 
 * @param {object} ulHeaderElt 
 * @param {object} buttonElt 
 */
function addContactButton(liContactElt, ulHeaderElt, buttonElt) {
    liContactElt.style.display = "block";
    ulHeaderElt.appendChild(liContactElt).appendChild(buttonElt);
}

/**
 * 
 * @param {object} ulHeaderElt 
 * @param {object} liImgElt 
 * @param {object} imgElt 
 * @param {string} picture
 */
function setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture, name) {
    liImgElt.style.display = "block";
    imgElt.setAttribute("src", picture);
    imgElt.setAttribute("alt", name);
    imgElt.style.width = "150px";
    imgElt.style.height = "150px";
    imgElt.style.borderRadius = "50%";
    ulHeaderElt.appendChild(liImgElt).appendChild(imgElt);
}

/**
 * displaying photographer data on header main
 * 
 * @param {string} photographer 
 */
function photographerContactFactory(photographer) {
    const [{ name, portrait, city, country, tagline }] = photographer;
    const picture = `assets/photographers/${portrait}`;

    addLiPhotographerData(liPhotographerDataElt, ulHeaderElt);
    setPhotographerName(nameElt, liPhotographerDataElt, name);
    setPhotographerCountry(countryElt, liPhotographerDataElt, city, country);
    setPhotographerTagline(liPhotographerDataElt, taglineElt, tagline);
    addContactButton(liContactElt, ulHeaderElt, buttonElt);
    setPhotographerImg(ulHeaderElt, liImgElt, imgElt, picture, name);
}

// media section functions

/**
 * 
 * @param {object} liMediaElt
 */
function addLiMedia(liMediaElt) {
    liMediaElt.style.display = "block";
}

/**
 * 
 * @param {object} figureMediaElt 
 * @param {object} liMediaElt 
 */
function addFigureMedia(figureMediaElt, liMediaElt) {
    figureMediaElt.style.margin = "0";
    liMediaElt.appendChild(figureMediaElt);
}

/**
 * 
 * @param {object} imgMediaElt 
 * @param {object} figureMediaElt 
 * @param {string} picture
 */
function setImgMedia(imgMediaElt, figureMediaElt, picture, title) {
    imgMediaElt.setAttribute("src", picture);
    imgMediaElt.setAttribute("alt", title);
    imgMediaElt.setAttribute("onclick", "openlightboxModal()");
    imgMediaElt.style.width = "400px";
    imgMediaElt.style.height = "400px";
    imgMediaElt.style.borderRadius = "5px";
    figureMediaElt.appendChild(imgMediaElt);
}

/**
 * 
 * @param {object} videoMediaElt 
 * @param {object} linkMediaElt 
 * @param {string} srcVideo
 */
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

/**
 * 
 * @param {object} figCaptionMediaElt 
 * @param {object} figureMediaElt 
 */
function addFigcaptionMedia(figCaptionMediaElt, figureMediaElt) {
    figCaptionMediaElt.style.display = "flex";
    figCaptionMediaElt.style.justifyContent = "space-between";
    figCaptionMediaElt.style.alignItems = "center";
    figCaptionMediaElt.style.margin = "8px 0";
    figureMediaElt.appendChild(figCaptionMediaElt);
}

/**
 * 
 * @param {object} figcaptionHeaderElt 
 * @param {object} figCaptionMediaElt 
 */
function addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt) {
    figcaptionHeaderElt.style.height = "0";
    figCaptionMediaElt.appendChild(figcaptionHeaderElt);
}

/**
 * 
 * @param {string} title 
 * @param {object} titleElt 
 * @param {object} figcaptionHeaderElt 
 */
function setTitleMedia(title, titleElt, figcaptionHeaderElt) {
    titleElt.textContent = title;
    titleElt.style.color = "#901C1C";
    figcaptionHeaderElt.appendChild(titleElt);
}

/**
 * 
 * @param {object} figureLikeElt 
 * @param {object} figCaptionMediaElt 
 */
function addLikeMedia(figureLikeElt, figCaptionMediaElt) {
    figureLikeElt.style.margin = "0";
    figureLikeElt.style.color = "#901C1C";
    figCaptionMediaElt.appendChild(figureLikeElt);
}

/**
 * 
 * @param {object} spanLikeElt 
 * @param {object} figureLikeElt 
 * @param {number} likes 
 */
function setLikesMedia(spanLikeElt, figureLikeElt, likes) {
    spanLikeElt.textContent = likes;
    spanLikeElt.style.paddingRight = "5px";
    figureLikeElt.appendChild(spanLikeElt);
}

/**
 * 
 * @param {object} figureLikeElt 
 * @param {object} iMediaElt 
 */
function addIconLikeMedia(figureLikeElt, iMediaElt) {
    iMediaElt.className = "fa-solid fa-heart";
    iMediaElt.style.cursor = "pointer";
    figureLikeElt.appendChild(iMediaElt);
}

/**
 * displaying photographerMedia data on section main
 * 
 * @param {object} media 
 * @returns {object}
 */
function photographerMediaFactory(media) {
    const { title, image, video, likes } = media;
    const picture = `assets/media/${image}`;
    const srcVideo = `assets/media/${video}`;
    
    // section media elements
    const liMediaElt = document.createElement("li");
    const figureMediaElt = document.createElement("figure");
    const imgMediaElt = document.createElement("img");
    const videoMediaElt = document.createElement("video");
    const figCaptionMediaElt = document.createElement("figcaption");
    const figcaptionHeaderElt = document.createElement("header");
    const titleElt = document.createElement("h3");
    const figureLikeElt = document.createElement("figure");
    const spanLikeElt = document.createElement("span");
    const iMediaElt = document.createElement("i");

    function getMediaCardDOM() {
        image ? setImgMedia(imgMediaElt, figureMediaElt, picture, title) : setVideoMedia(videoMediaElt, figureMediaElt, srcVideo);
        addLiMedia(liMediaElt);
        addFigureMedia(figureMediaElt, liMediaElt);
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

/**
 * displaying total number likes + price per day
 * 
 * @param {object} photographer 
 * @param {number} totalLikes 
 */
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

