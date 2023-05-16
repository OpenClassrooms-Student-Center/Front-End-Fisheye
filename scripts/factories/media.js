export function mediaFactory(media) {
  const { image, video, likes, photographerId, title} = media


  function getMediaCardDom() {

    const article = document.createElement("article");
    article.classList.add("media");
    const mediaSection = document.querySelector(".photographer__content");
    // console.log(mediaSection);
    mediaSection.appendChild(article)

    if (image) {
      const source = `assets/photographers/${photographerId}/${image}`;
      const img = document.createElement("img");
      img.setAttribute("src", source);
      img.setAttribute("alt", title);
      img.className += "media__img";
      article.appendChild(img)
    }
    if (video) {
      const source = `assets/photographers/${photographerId}/${video}`;
      const vid = document.createElement("video");
      vid.setAttribute("src", source);
      vid.setAttribute("alt", title);
      vid.className += "media__video";
      article.appendChild(vid)
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

  return { title, likes, getMediaCardDom};
}
