function mediaFactory(media) {
  const { id, photographerId, title, image, video, likes } = media;

  function getMediaCard() {
    const article = document.createElement("article");
    const mediaInfos = document.createElement("div");
    let mediaTag = document.createElement("img");
    const h2 = document.createElement("h2");
    const likesTag = document.createElement("span");

    article.setAttribute("class", "media");
    mediaInfos.setAttribute("class", "media-infos");
    h2.textContent = title;
    likesTag.textContent = `${likes} ♡`;
    likesTag.setAttribute("class", "likes");
    likesTag.style.cursor = "pointer";

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
      const source = document.createElement("source");
      source.setAttribute(
        "src",
        `assets/images/medias/${photographerId}/${video}`
      );
      mediaTag.appendChild(source);
    }

    mediaTag.setAttribute("class", "media-tag");
    mediaTag.setAttribute("id", id);
    mediaTag.setAttribute("alt", title);
    mediaTag.style.cursor = "pointer";
    mediaTag.addEventListener("click", (event) => {
      displayLightBox(event.target.id);
    });

    mediaInfos.appendChild(h2);
    mediaInfos.appendChild(likesTag);
    article.appendChild(mediaTag);
    article.appendChild(mediaInfos);

    return article;
  }

  return { getMediaCard };
}
