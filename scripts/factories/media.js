function mediaFactory(data) {
  const { id, image, likes, price, title, date, photographerId, video } = data;

  function getPhotographerDom() {
    const article = document.createElement("article");
    const mediaInfos = document.createElement("div");
    mediaInfos.classList.add("media-infos");

    const mediaTitle = document.createElement("span");
    mediaTitle.classList.add("title");
    mediaTitle.innerText = title;

    const medialLikes = document.createElement("span");
    medialLikes.innerHTML = `<span>${likes}</span> <i class="fa-solid fa-heart"></i>`;
    medialLikes.classList.add("likes");

    mediaInfos.appendChild(mediaTitle);
    mediaInfos.appendChild(medialLikes);

    if (image) {
      const mediaMiniature = document.createElement("img");
      mediaMiniature.setAttribute("src", `../../assets/images/medias/${image}`);
      mediaMiniature.setAttribute("alt", `Titre: ${title}`);
      mediaMiniature.classList.add("media-miniature");
      article.appendChild(mediaMiniature);
    }
    if (video) {
      const mediaMiniature = document.createElement("video");
      const source = document.createElement("source");
      source.setAttribute("src", `../../assets/images/medias/${video}`);
      source.setAttribute("type", "video/mp4");
      const error = document.createElement("p");
      error.innerText =
        "Votre navigateur ne permet pas l'affichage de ce media.";
      mediaMiniature.setAttribute("controls", "");
      mediaMiniature.classList.add("media-miniature");
      mediaMiniature.appendChild(source);
      mediaMiniature.appendChild(error);
      article.appendChild(mediaMiniature);
    }

    article.appendChild(mediaInfos);
    article.classList.add("media-article");
    return article;
  }

  return { getPhotographerDom };
}
