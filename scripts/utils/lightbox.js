class Lightbox {
  constructor(response) {
    this.medias = response.media;
  }
  generateLightbox() {
    this.lightboxBuilder();
  }

  lightboxBuilder() {
    console.log(this.medias);

    //DOM elements
    const medias = document.querySelectorAll(".gallerie img, a video");
    const images = document.querySelectorAll(".gallerie img");
    const lightbox = document.createElement("div");

    // let title = medias

    // if (this.medias.title == medias.title)

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
      const buildLightboxMedia = document.createElement("div");
      const containerLightbox = document.querySelector(".container");

      if (a.includes("Video")) {
        containerLightbox.appendChild(buildLightboxMedia);
        buildLightboxMedia.classList.add("mediaCard");
        buildLightboxMedia.innerHTML = `<video controls src="${media.src}"></video>
                                    <h2> ahah </h2>`;
      } else {
        //cree les img dans la lightbox
        containerLightbox.appendChild(buildLightboxMedia);
        buildLightboxMedia.classList.add("mediaCard");
        buildLightboxMedia.innerHTML = `<img src="${media.src}"/>
                                    <h2>${this.media}</h2>`;
      }

      media.addEventListener("click", (e) => {
        //affiche la lightbox
        lightbox.classList.add("active");
        buildLightboxMedia.classList.add("lightboxImg");
      });
    });
    const pix = document.querySelectorAll(".container div");

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
      etape++;

      if (etape >= pix.length) {
        etape = 0;
      }

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
        pix[i].classList.remove("lightboxImg");
      });
    }
  }
}

export { Lightbox };
