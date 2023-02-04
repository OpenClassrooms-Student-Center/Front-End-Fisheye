/************** CAROUSEL *******************/
const carouselCloseButton = document.querySelector(".close-carousel");
const previousButton = document.querySelector(".previous-slide");
const carouselModal = document.getElementById("carousel_modal");
const nextButton = document.querySelector(".next-slide");

const video = carouselModal.querySelector("video");
const image = carouselModal.querySelector("img");
const title = carouselModal.querySelector("h2");

let currentIndex = undefined;
let mediasSlide = [];

/****** addEventListener *******/
carouselCloseButton.addEventListener("click", closeCarousel);
carouselCloseButton.addEventListener("keypress", closeCarousel);

previousButton.addEventListener("click", showPrevious);
previousButton.addEventListener("keypress", showPrevious);

nextButton.addEventListener("click", showNext);
nextButton.addEventListener("keypress", showNext);

/** fonction openCarousel */
function openCarousel(media, medias, index) {
  mediasSlide = medias;
  currentIndex = index;

  carouselModal.style.display = "block";
  carouselCloseButton.focus();
  title.textContent = medias[index].title;

  if (media.image) {
    image.style.display = "block";
    video.style.display = "none";
    image.setAttribute(
      "src",
      `../../assets/images/medias/${medias[index].image}`
    );
    image.setAttribute("alt", `Titre de l'image: ${medias[index].title}`);
  }
  if (media.video) {
    video.style.display = "block";
    image.style.display = "none";
    video.setAttribute(
      "src",
      `../../assets/images/medias/${medias[index].video}`
    );
  }
}

/** fonction showPrevious */
function showPrevious() {
  if (currentIndex > 0) {
    if (mediasSlide[currentIndex - 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex - 1].image}`
      );
      image.setAttribute(
        "alt",
        `Titre de l'image: ${mediasSlide[currentIndex - 1].title}`
      );

      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex - 1].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex -= 1;
  } else {
    if (mediasSlide[mediasSlide.length - 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${
          mediasSlide[mediasSlide.length - 1].image
        }`
      );
      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${
          mediasSlide[mediasSlide.length - 1].video
        }`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex = mediasSlide.length - 1;
  }
  title.textContent = mediasSlide[currentIndex].title;
}

/** fonction showNext */
function showNext() {
  if (currentIndex < mediasSlide.length - 1) {
    if (mediasSlide[currentIndex + 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex + 1].image}`
      );
      image.setAttribute(
        "alt",
        `Titre de l'image: ${mediasSlide[currentIndex + 1].title}`
      );

      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex + 1].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex += 1;
  } else {
    if (mediasSlide[0].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[0].image}`
      );
      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[0].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex = 0;
  }
  title.textContent = mediasSlide[currentIndex].title;
}

/** fonction closeCarousel ***/
function closeCarousel() {
  carouselModal.style.display = "none";
}
