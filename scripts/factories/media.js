export function mediaFactory(media) {
  const { image, video, likes, photographerId, title} = media


  function getMediaCardDom() {

    const article = document.createElement("article");
    article.classList.add("media");
    const mediaSection = document.querySelector(".photographer__content");
    mediaSection.appendChild(article)

    if (image) {
      const thumbnail = `assets/photographers/${photographerId}/${image}`;
      const img = document.createElement("img");
      img.classList.add("media__img")
      img.setAttribute("src", thumbnail);
      img.setAttribute("alt", title);
      article.appendChild(img)
    }
    if (video) {
      const thumbnail = `assets/photographers/${photographerId}/${video}`;
      const vid = document.createElement("video");
      vid.setAttribute("controls", "true")
      vid.setAttribute("src", thumbnail)
      vid.setAttribute("type", "video/mp4")
      vid.innerHTML = "Votre navigateur ne permet pas de lire les vidéos. Mais vous pouvez toujours <a href=`${thumbnail}`>la télécharger</a> !";
      vid.className += "media__video";
      article.appendChild(vid);
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media__info")
    article.appendChild(mediaInfo);

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media__title")
    mediaTitle.innerText = title
    mediaInfo.appendChild(mediaTitle);

    const mediaLike = document.createElement("p");
    mediaLike.classList.add("media__like");
    mediaLike.innerHTML = `${likes} <i class="fa-solid fa-heart "></i>`
    mediaInfo.appendChild(mediaLike);

    return (article)
  }

  return { title, likes, getMediaCardDom };
}
