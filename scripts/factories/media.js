function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const imgInfos = document.createElement("div");

    function isVideo() {
      video
        ? (img = document.createElement("video")).setAttribute(
            "src",
            `assets/images/${video}`
          )
        : (img = document.createElement("img")).setAttribute(
            "src",
            `assets/images/${image}`
          );

      img.classList.add("sample-image");
      img.setAttribute("alt", `${title}, closeup view`);
      return img;
    }

    isVideo();
    imgInfos.innerHTML = `<p class="image-title">${title}</p>
                          <div class="image-likes" aria-label="likes">
                            <span class="likes-number">${likes}</span>
                            <img src="assets/icons/heart.png" class="likes-heart" alt="heart icon">
                          </div>`;
    imgInfos.classList.add("image-infos");
    article.appendChild(img);
    article.appendChild(imgInfos);
    article.classList.add("media-article");
    return article;
  }

  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getMediaCardDOM,
  };
}
