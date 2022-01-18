class Lightbox {
  constructor(medias, name) {
    this.medias = medias;
    this.name = name;
    this.index = 0;
    this.lightbox = null;
  }
  displayLightbox(idMedia) {
    //récupérer l'Id de l'image courante
    this.calculateIndexById(idMedia);

    // Lightbox DOMelements

    const lightboxContainer = document.createElement("div");
    lightboxContainer.setAttribute("class", "lightboxContainer");
    const main = document.querySelector("main");
    main.appendChild(lightboxContainer);

    this.lightbox = document.createElement("div");
    this.lightbox.setAttribute("class", "lightbox");
    lightboxContainer.appendChild(this.lightbox);

    // buttons previous, next & close

    const prev = document.createElement("button");
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prev.setAttribute("class", "lightbox-prev");

    prev.addEventListener("click", (event) => {
      this.goPrevImage();
    });

    const next = document.createElement("button");
    next.innerHTML = '<i class="fas fa-chevron-right"></i>';
    next.setAttribute("class", "lightbox-next");

    next.addEventListener("click", (event) => {
      this.goNextImage();
    });

    const close = document.createElement("button");
    close.innerHTML = '<i class="fas fa-times"></i>';
    close.setAttribute("class", "lightbox-close");
    close.addEventListener("click", (event) => {
      //la target de l'event c'est le button et son parent le plus proche qui a la classe container->fermer
      event.target.closest(".lightboxContainer").remove();
    });

    this.showImage();
    this.showTitle();

    lightboxContainer.appendChild(prev);
    lightboxContainer.appendChild(next);
    lightboxContainer.appendChild(close);

    lightboxContainer.style.display = "block";
  }

  //recherche dans le array medias de ce photographe les img par leur id et return index de l'img courante
  calculateIndexById(id) {
    for (let i = 0; i < this.medias.length; i++) {
      if (this.medias[i].id == id) {
        this.index = i;
        break;
      }
    }
  }

  goNextImage() {
    //incrémenter +1
    this.index += 1;
    //index> à taille du tableau -1 ? si oui index retourne à 0
    //this.index > this.medias.length - 1 ? (index = 0) : "";
    if (this.index > this.medias.length) {
      this.index = 0;
    }
    this.showImage();
    this.showTitle();
  }

  goPrevImage() {
    this.index -= 1;
    if (this.index < 0) {
      this.index = this.medias.length - 1;
    }
    this.showImage();
    this.showTitle();
    console.log(this.index);
  }

  showImage() {
    this.hideImage();

    let htmlMedia = Factory.getLightboxMedia(
      this.medias[this.index],
      this.name
    );
    this.lightbox.appendChild(htmlMedia);
  }

  hideImage() {
    let divMedia = document.querySelector(".lightbox-media");
    if (divMedia) {
      divMedia.remove();
    }
  }

  showTitle() {
    this.hideTitle();
    const title = document.createElement("span");
    title.textContent = this.medias[this.index].title;
    title.setAttribute("class", "lightbox-legend");
    this.lightbox.appendChild(title);
  }

  hideTitle() {
    let divTitle = document.querySelector(".lightbox-legend");
    if (divTitle) {
      divTitle.remove();
    }
  }
}
