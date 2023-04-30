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
    mediaTag.setAttribute("class", "media-tag");
    mediaTag.setAttribute("id", id);
    mediaTag.setAttribute("alt", title);
    mediaTag.style.cursor = "pointer";
    h2.textContent = title;
    likesTag.textContent = `${likes} ♡`;
    likesTag.setAttribute("class", "likes");
    likesTag.style.cursor = "pointer";

    mediaTag.addEventListener("click", (event) => {
      displayLightBox(event.target.id);
    });

    likesTag.addEventListener("click", () => {
      const totalLikesTag = document.querySelector(".total-likes__likes");
      const totalLikes = parseInt(totalLikesTag.textContent);
      if (!media.isLiked) {
        media.isLiked = true;
        media.likes++;
        likesTag.textContent = `${media.likes} ♥`;
        totalLikesTag.textContent = `${totalLikes + 1} ♥`;
      } else {
        media.isLiked = false;
        media.likes--;
        likesTag.textContent = `${media.likes} ♡`;
        totalLikesTag.textContent = `${totalLikes - 1} ♥`;
      }
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
