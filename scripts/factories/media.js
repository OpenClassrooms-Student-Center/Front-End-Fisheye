function mediaFactory(media) {
  const { photographerId, title, image, video, likes } = media;

  function getMediaCard() {
    const article = document.createElement("article");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const likesTag = document.createElement("span");

    article.setAttribute("class", "media");
    div.setAttribute("class", "media-infos");
    h2.textContent = title;
    likesTag.textContent = `${likes} ❤`;
    likesTag.setAttribute("class", "likes");

    if (image) {
      const mediaTag = document.createElement("img");
      mediaTag.setAttribute(
        "src",
        `assets/images/medias/${photographerId}/${image}`
      );
      article.appendChild(mediaTag);
    } else {
      const mediaTag = document.createElement("video");
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
