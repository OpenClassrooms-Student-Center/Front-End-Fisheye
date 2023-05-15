export function mediaFactory(media) {
  const { id, date, image, video, likes, photographerId, price, title} = media

  const source = `assets/photographers/${photographerId}/${image}`;

  function getMediaCardDom() {

    const article = document.createElement("article");
    article.classList.add("media");
    const mediaSection = document.querySelector(".photographer__content");
    // console.log(mediaSection);
    mediaSection.appendChild(article)

    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", source);
      img.setAttribute("alt", title);
      img.className += "media__img";
      article.appendChild(img)
    }
    if (video) {
      const video = document.createElement("video");
      video.setAttribute("src", source);
      video.setAttribute("alt", title);
      video.className += "media__video";
      article.appendChild(video)
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

  return { title, likes, getMediaCardDom}
}
