export function mediaFactory(mediaPath, mediaTitle, likes) {
    const mediaContainer = document.createElement("figure");
    mediaContainer.classList.add("media-container");

    const media = document.createElement("img");
    media.classList.add("media-container__media");
    media.setAttribute("alt", mediaTitle);
    media.setAttribute("src", mediaPath);

    mediaContainer.appendChild(media);

    console.log(mediaContainer);
}
