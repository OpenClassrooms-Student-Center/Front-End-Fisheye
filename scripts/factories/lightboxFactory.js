/* eslint-disable */
function lightboxFactory(datas, photographerName) {
  const firstName = photographerName;

  function addMediaDOM() {
    const sliderContent = document.querySelector(".slider-content");
    const lighthox = document.querySelector("#lightbox");
    const close = document.querySelector(".close");

    datas.forEach((data, id) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const videoElement = document.createElement("video");
      const source = document.createElement("source");
      const title = document.createElement("div");

      // Image
      if (data.source.includes("jpg")) {
        img.setAttribute("src", `assets/medias/${firstName}/${data.source}`);
        img.setAttribute("alt", data.title);
        div.setAttribute("data-id", id);
        div.classList.add("content");
        div.setAttribute("role", "img");
        div.setAttribute("aria-label", `C'est une image de ${data.title}`);
        title.innerHTML = data.title;
        div.appendChild(img);
        div.appendChild(title);
        sliderContent.appendChild(div);
      }

      // Video
      if (data.source.includes("mp4")) {
        videoElement.setAttribute("controls", "controls");
        videoElement.setAttribute("data-video", "style");
        sliderContent.appendChild(videoElement);
        source.setAttribute("src", `assets/medias/${firstName}/${data.source}`);
        div.setAttribute("data-id", id);
        videoElement.appendChild(source);
        div.appendChild(videoElement);
        sliderContent.appendChild(div);
      }
    });

    // Open lightbox
    const mediaSrc = document.querySelectorAll(".media-source");
    mediaSrc.forEach((el) => {
      el.addEventListener("click", () => {
        lighthox.style.display = "flex";
      });
    });

    // Close lightbox
    close.addEventListener("click", () => {
      lighthox.style.display = "none";
    });
  }

  return { addMediaDOM };
}
