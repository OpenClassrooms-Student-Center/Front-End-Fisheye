// Create the gallery of the photographer

function galleryFactory(photo) {
  const { title, image, video, likes, date } = photo;

  // determiner si image ou video
  let media, isVideo;

  if (image === undefined) {
    media = `assets/portfolio/${video}`;
    isVideo = true;
  } else {
    media = `assets/portfolio/${image}`;
    isVideo = false;
  }

  function createMediaDom(media) {
    let mediaElement;

    if (isVideo) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", media);
      mediaElement.className = "media video";
    } else {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", media);
      mediaElement.className = "media";
    }
    mediaElement.setAttribute("title", title);
    mediaElement.setAttribute("tabindex", 0);
    return mediaElement;
  }

  function createGalleryDOM() {
    const figure = document.createElement("figure");
    figure.className = "figure-element";

    const imgOrVideo = createMediaDom(media);
    const imgDetails = document.createElement("div");
    imgDetails.className = "img_details";
    const caption = document.createElement("figcaption");
    caption.textContent = title;
    const imgLikes = document.createElement("div");
    imgLikes.className = "img_likes";
    let nbOfLike = document.createElement("p");
    nbOfLike.textContent = likes;
    nbOfLike.className = "likesNb";
    const heart = document.createElement("i");
    heart.className = "fa-solid fa-heart fa heart-icon";
    heart.setAttribute("aria-label", "likes");

    //Raccorde tous les elements ensemble

    figure.appendChild(imgOrVideo);
    figure.appendChild(imgDetails);
    imgDetails.appendChild(caption);
    imgDetails.appendChild(imgLikes);
    imgLikes.appendChild(nbOfLike);
    imgLikes.appendChild(heart);

    return figure;
  }

  return { title, likes, date, createGalleryDOM };
}
