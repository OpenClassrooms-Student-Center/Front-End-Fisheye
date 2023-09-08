// Element
const lighthox = document.querySelector("#lightbox");
const close = document.querySelector(".close");
const card = document.querySelector(".card");
const sliderContainer = document.querySelector(".slider-container");
const sliderContent = document.querySelector(".slider-content");
const allContent = document.querySelectorAll(".photographer-media");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Create element
const videoElement = document.createElement("video");
const source = document.createElement("source");
const title = document.createElement("div");

// Display all medias in lightbox
function addMediaDOM(datas, firstName) {
  const { title, source, like } = datas[0];

  datas.forEach((data, id) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const videoElement = document.createElement("video");
    const source = document.createElement("source");
    const title = document.createElement("div");

    // Image
    if (data.source.includes("jpg")) {
      img.setAttribute("src", `assets/medias/${firstName}/${data.source}`);
      div.setAttribute("data-id", id);
      div.classList.add("content");
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
}

// Slider
setTimeout(() => {
  let slideIndex = 0;
  const slides = sliderContainer.querySelectorAll(".slider-content > div");
  const slideCount = slides.length;

  prevButton.addEventListener(["click"], () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
  });

  function updateSlider() {
    const selectedSlide = slides[slideIndex];
    const scrollPosition =
      selectedSlide.offsetLeft - sliderContainer.offsetLeft;
    sliderContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }

  updateSlider();
}, 1000);

// Open lightbox
function openLightbox() {
  const mediaSrc = document.querySelectorAll(".media-source");
  mediaSrc.forEach((el) => {
    el.addEventListener("click", () => {
      lighthox.style.display = "flex";
    });
  });
}

setTimeout(() => {
  openLightbox();
}, 2000);

close.addEventListener("click", () => {
  lighthox.style.display = "none";
});
