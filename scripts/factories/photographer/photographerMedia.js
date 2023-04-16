"use_strict";

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
    srcElt.setAttribute("src", srcVideo);
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
    iMediaElt.setAttribute("title","liker ou disliker le media");
    iMediaElt.setAttribute("aria-hidden","true");
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
    
    // DOM elements
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

