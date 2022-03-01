function generateLightbox() {
  //DOM elements
  const medias = document.querySelectorAll(".gallerie img, a video");
  const images = document.querySelectorAll(".gallerie img");
  const lightbox = document.createElement("div");

  //ajout d'elements HTML
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox__prev">
        <i class="fas fa-chevron-left"></i>
        </button>
    <div class="container"></div>
    <button class="lightbox__next">
            <i class="fas fa-chevron-right"></i>
        </button>
        <button class="lightbox__close">
        <i class="fa-solid fa-xmark"></i>
        </button>`;
  document.body.appendChild(lightbox);

  //ajoute une classe "active" qui rend la lightbox visible au clic
  medias.forEach((media) => {
    let a = media.toString();
    const video = document.createElement("video");
    const img = document.createElement("img");
    const containerLightbox = document.querySelector(".container");
    console.log(containerLightbox);

    if (a.includes("Video")) {
      console.log("je pass ici");

      video.src = media.src;
      containerLightbox.appendChild(video);
      video.setAttribute("controls", "");
    } else {
      //cree les img dans la lightbox
      containerLightbox.appendChild(img);
      img.src = media.src;
    }

    media.addEventListener("click", (e) => {
      console.log(media);
      //affiche la lightbox
      lightbox.classList.add("active");
      //affiche la photo selectionnée
      if (a.includes("Image")) {
        img.classList.add("lightboxImg");
      } else {
        video.classList.add("lightboxImg");
      }
    });
  });
  const pix = document.querySelectorAll("#lightbox img, #lightbox video");

  //ferme la lightbox et retire la classe "acitve" quand on clic sur la croix
  const closeBtn = document.querySelector(".lightbox__close");
  closeBtn.addEventListener("click", (e) => {
    let mediaActive = document.querySelector(".lightboxImg");
    lightbox.classList.remove("active");
    mediaActive.classList.remove("lightboxImg");
  });

  //suivant
  const nextBtn = document.querySelector(".lightbox__next");
  const prevBtn = document.querySelector(".lightbox__prev");
  //const pix = document.querySelectorAll("#lightbox img");
  let etape = 0;

  nextBtn.addEventListener("click", () => {
    console.log(pix);

    etape++;

    if (etape >= pix.length) {
      etape = 0;
    }
    console.log(etape);
    enleverImg();
    pix[etape].classList.add("lightboxImg");
  });

  prevBtn.addEventListener("click", () => {
    etape--;
    if (etape < 0) {
      etape = pix.length - 1;
    }
    enleverImg();
    pix[etape].classList.add("lightboxImg");
  });

  //   //aller au suivant
  //   //retirer la class lighboxImg

  //   let etape = 0;
  function enleverImg() {
    medias.forEach((image, i) => {
      let currentImg = document.querySelector(".lightboxImg");
      console.log(pix);
      pix[i].classList.remove("lightboxImg");
    });
  }
}

export { generateLightbox };
