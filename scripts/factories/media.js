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

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media__title")
    mediaTitle.innerText = title
    // console.log(mediaTitle);
    article.appendChild(mediaTitle);
    // console.log(article);

    return (article)
  }

  return { title, likes, getMediaCardDom}
}
