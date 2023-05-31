export function mediaFactory(media) {
  const { id, image, video, likes, photographerId, title} = media

  function getMediaCardDom() {
    const article = document.createElement("article");
    article.classList.add("media");
    article.id = id
    const mediaSection = document.querySelector(".photographer__content");
    mediaSection.appendChild(article)

    if (image) {
      const thumbnail = `assets/photographers/${photographerId}/${image}`;
      const img = document.createElement("img");
      img.classList.add("media__img");
      img.setAttribute("loading", "lazy");
      img.setAttribute("src", thumbnail);
      img.setAttribute("alt", title);
      img.id = id
      article.appendChild(img)
    }
    if (video) {
      const thumbnail = `assets/photographers/${photographerId}/${video}`;
      const vid = document.createElement("video");
      vid.setAttribute("loading", "lazy");
      vid.setAttribute("src", thumbnail);
      vid.setAttribute("type", "video/mp4");
      vid.innerHTML = "Votre navigateur ne permet pas de lire les vidéos. Mais vous pouvez toujours <a href=`${thumbnail}`>la télécharger</a> !";
      vid.className += "media__video";
      vid.id = id
      article.appendChild(vid);
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media__info")
    article.appendChild(mediaInfo);

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media__title")
    mediaTitle.innerText = title
    mediaInfo.appendChild(mediaTitle);

    const mediaLike = document.createElement("div");
    mediaLike.classList.add("media__likes");
    const para = document.createElement("p");
    para.classList.add("media__likeNumber");
    para.innerText = likes;
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-heart", "media__likeIcon");
    mediaInfo.appendChild(mediaLike);
    mediaLike.appendChild(para)
    mediaLike.appendChild(icon)


    return (article)
  }

  return { title, likes, getMediaCardDom };
}
