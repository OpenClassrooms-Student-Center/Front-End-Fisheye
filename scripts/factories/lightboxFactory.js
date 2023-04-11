
// functions

/**
 * 
 * @param {string} picture 
 * @param {object} itemElt 
 */
function addImgMedia(picture, itemElt) {
    const imgMediaElt = document.createElement("img");
    imgMediaElt.setAttribute("src", picture);
    itemElt.appendChild(imgMediaElt);
}

/**
 * 
 * @param {string} srcVideo 
 * @param {object} itemElt
 */
function addVideoMedia(srcVideo, itemElt) {
    const videoMediaElt = document.createElement("video");
    const srcElt = document.createElement("source");
    srcElt.setAttribute("src", srcVideo)
    srcElt.setAttribute("type","video/mp4");
    videoMediaElt.setAttribute("controls","controls");
    videoMediaElt.appendChild(srcElt);
    itemElt.appendChild(videoMediaElt);
}

/**
 * 
 * @param {string} title 
 * @param {object} itemElt 
 */
function addTitleMedia(title, itemElt) {
    const titleMediaElt = document.createElement("h3");
    titleMediaElt.textContent = title;
    itemElt.appendChild(titleMediaElt);
}

/**
 * 
 * @param {object} media 
 */
function photographerLightboxFactory(media) {
    const { image, title, video } = media;
    const picture = `assets/media/${image}`;
    const srcVideo = `assets/media/${video}`;
    const carouselContainerElt =  document.querySelector(".carousel-container");
    const itemElt = document.createElement("figure");
    const carousselItemElt = document.createElement("div");

    itemElt.classList.add("item");
    carousselItemElt.classList.add("carousel-item");
    image ? addImgMedia(picture, itemElt) : addVideoMedia(srcVideo, itemElt);
    addTitleMedia(title, itemElt);
    carouselContainerElt.appendChild(carousselItemElt).appendChild(itemElt);
}
