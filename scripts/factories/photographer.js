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
    ulHeaderElt.appendChild(liPhotographerDataElt);
}

/**
 * 
 * @param {object} nameElt 
 * @param {object} liPhotographerDataElt 
 * @param {string} name
 */
function setPhotographerName(nameElt, liPhotographerDataElt, name) {
    nameElt.textContent = name;
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
    imgElt.setAttribute("src", picture);
    imgElt.setAttribute("alt", name);
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
 * @param {object} figureMediaElt 
 * @param {object} liMediaElt 
 */
function addFigureMedia(figureMediaElt, liMediaElt) {
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
    figureMediaElt.appendChild(figCaptionMediaElt);
}

/**
 * 
 * @param {object} figcaptionHeaderElt 
 * @param {object} figCaptionMediaElt 
 */
function addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt) {
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
    figcaptionHeaderElt.appendChild(titleElt);
}

/**
 * 
 * @param {object} figureLikeElt 
 * @param {object} figCaptionMediaElt 
 */
function addLikeMedia(figureLikeElt, figCaptionMediaElt) {
    figCaptionMediaElt.appendChild(figureLikeElt);
}

/**
 * 
 * @param {object} likeElt 
 * @param {object} figureLikeElt 
 * @param {number} likes 
 */
function setLikesMedia(likeElt, figureLikeElt, likes) {
    likeElt.textContent = likes;
    figureLikeElt.appendChild(likeElt);
}

/**
 * 
 * @param {object} figureLikeElt 
 * @param {object} iMediaElt 
 */
function addIconLikeMedia(figureLikeElt, iMediaElt) {
    iMediaElt.className = "fa-solid fa-heart";
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
    const likeElt = document.createElement("b");
    const iMediaElt = document.createElement("i");

    function getMediaCardDOM() {
        image ? setImgMedia(imgMediaElt, figureMediaElt, picture, title) : setVideoMedia(videoMediaElt, figureMediaElt, srcVideo);
        addFigureMedia(figureMediaElt, liMediaElt);
        addFigcaptionMedia(figCaptionMediaElt, figureMediaElt);
        addFigcaptionHeaderMedia(figcaptionHeaderElt, figCaptionMediaElt);
        setTitleMedia(title, titleElt, figcaptionHeaderElt);
        addLikeMedia(figureLikeElt, figCaptionMediaElt);
        setLikesMedia(likeElt, figureLikeElt, likes);
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

