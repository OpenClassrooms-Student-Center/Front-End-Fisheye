function mediaFactory(media) {
  const { id, photographerId, title, image, video, likes } = media;

  function getMediaCard() {
    const article = document.createElement("article");
    const div = document.createElement("div");
    let mediaTag = document.createElement("img");
    const h2 = document.createElement("h2");
    const likesTag = document.createElement("span");
    
    article.setAttribute("class", "media");
    div.setAttribute("class", "media-infos");
    mediaTag.setAttribute("id", id);
    mediaTag.style.cursor = "pointer";
    h2.textContent = title;
    likesTag.textContent = `${likes} ❤`;
    likesTag.setAttribute("class", "likes");

    mediaTag.addEventListener("click", (event) => {
      displayLightBox(event.target.id);
    });

    if (image) {
      mediaTag.setAttribute(
        "src",
        `assets/images/medias/${photographerId}/${image}`
      );
      article.appendChild(mediaTag);
    } else {
      mediaTag = document.createElement("video");
      mediaTag.controls = true;
      const source = document.createElement("source");
      source.setAttribute(
        "src",
        `assets/images/medias/${photographerId}/${video}`
      );
      mediaTag.appendChild(source);
      article.appendChild(mediaTag);
    }
    article.appendChild(div);
    div.appendChild(h2);
    div.appendChild(likesTag);

    return article;
  }

  return { getMediaCard };
}
