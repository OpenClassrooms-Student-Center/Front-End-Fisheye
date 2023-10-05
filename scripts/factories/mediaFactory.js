/* eslint-disable */
function mediaFactory(data, photographerName) {
  const { title, image, video, likes, date } = data;
  const firstName = photographerName;

  function getMediaDOM() {
    const mediaSection = document.querySelector(".photographer-media");
    const divMedia = document.createElement("div");
    const divInfo = document.createElement("div");
    const img = document.createElement("img");
    const videoElement = document.createElement("video");
    const source = document.createElement("source");
    const h3 = document.createElement("h3");
    const like = document.createElement("i");

    like.classList.add("fa-solid", "fa-heart", "like");
    divMedia.classList.add("media");
    divInfo.classList.add("info");
    img.classList.add("media-source", "image");
    videoElement.classList.add("media-source", "video");

    divMedia.setAttribute("role", "img");
    divMedia.setAttribute("aria-label", `C'est une image de ${title}`);

    if (image) {
      const images = `assets/medias/${firstName}/${image}`;

      img.setAttribute("src", images);
      img.setAttribute("alt", title);
      divMedia.setAttribute("data-date", date);

      h3.innerHTML = title;
      like.innerHTML = likes;

      divInfo.appendChild(h3);
      divInfo.appendChild(like);

      divMedia.appendChild(img);
      divMedia.appendChild(divInfo);
      mediaSection.appendChild(divMedia);
    }

    if (video) {
      const videos = `assets/medias/${firstName}/${video}`;

      h3.textContent = title;

      divMedia.setAttribute("data-date", date);
      videoElement.appendChild(source);
      videoElement.setAttribute("width", "350px");
      videoElement.setAttribute("height", "300px");
      videoElement.setAttribute("data-video", "style");
      source.setAttribute("src", videos);
      like.innerHTML = likes;
      divInfo.appendChild(h3);
      divInfo.appendChild(like);
      divMedia.appendChild(videoElement);
      divMedia.appendChild(divInfo);
      mediaSection.appendChild(divMedia);
    }

    const allMedias = document.querySelectorAll(".media");
    allMedias.forEach((el, id) => {
      el.setAttribute("data-id", id);
      el.setAttribute("tabindex", 0);
    });
  }

  return { getMediaDOM };
}
