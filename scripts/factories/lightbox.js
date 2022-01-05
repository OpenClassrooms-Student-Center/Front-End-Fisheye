class Lightbox {
  constructor(medias, name) {
    this.medias = medias;
    this.name = name;
  }
  displayLightbox(idMedia) {
    console.log(idMedia);
    this.calculateIndexById(idMedia); // ds ce contexte on appelle calculate (this)

    // Lightbox elements

    const lightboxContainer = document.createElement("div");
    lightboxContainer.setAttribute("class", "lightboxContainer");
    const main = document.querySelector("main");
    main.appendChild(lightboxContainer);

    const lightbox = document.createElement("div");
    lightbox.setAttribute("class", "lightbox");
    lightboxContainer.appendChild(lightbox);

    // buttons previous, next & close

    const prev = document.createElement("button");
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prev.setAttribute("class", "lightbox-prev");

    prev.addEventListener("click", (event) => {
      //avec findIndex on cherche ds medias la position (index) de l'element courant
      let index = this.medias.findIndex((media) => idMedia == media.id);
      //index trouvé, à décrementer
      index -= 1;
      // index est < 0 ? si oui boucle au dernier index du tableau (taille du tableau -1) sinon on continue
      index < 0 ? (index = this.medias.length - 1) : "";

      const isLightBox = document.querySelector(".lightboxContainer");
      //si la lightbox est déjà existante elle doit etre supprimée
      if (isLightBox) {
        isLightBox.remove();
      }
      //sinon elle est créé
      let lightboxPrev = new Lightbox(this.medias, this.name);
      lightboxPrev.displayLightbox(this.medias[index].id);
    });

    const next = document.createElement("button");
    next.innerHTML = '<i class="fas fa-chevron-right"></i>';
    next.setAttribute("class", "lightbox-next");

    next.addEventListener("click", (event) => {
      //findIndex on cherche ds medias la position (index) de l'element courant
      let index = this.medias.findIndex((media) => idMedia == media.id);
      //incrémenter +1
      index += 1;
      //index> à taille du tableau -1 ? si oui index retourne à 0
      index > this.medias.length - 1 ? (index = 0) : "";
      //verifier que lightbox est existante ou pas
      const isLightBox = document.querySelector(".lightboxContainer");
      if (isLightBox) {
        isLightBox.remove();
      }
      let lightboxPrev = new Lightbox(this.medias, this.name);
      lightboxPrev.displayLightbox(this.medias[index].id);
    });

    const close = document.createElement("button");
    close.innerHTML = '<i class="fas fa-times"></i>';
    close.setAttribute("class", "lightbox-close");
    close.addEventListener("click", (event) => {
      //la target de l'event c'est le button son parent le plus proche qui à la classe container->fermer
      event.target.closest(".lightboxContainer").remove();
    });
    console.log("ok");

    // Lightbox on click for each pics

    const title = document.createElement("span");
    let index = this.medias.findIndex((media) => idMedia == media.id);
    title.textContent = this.medias[index].title;
    title.setAttribute("class", "legend lightbox-legend");
    lightbox.appendChild(title);
    console.log(title);

    if (this.medias[index].video) {
      const video = document.createElement("video");
      const vids = `assets/Sample Photos/${this.name}/${
        this.medias[this.index].video
      }`;
      video.setAttribute("class", "lightbox-img");
    }

    const img = document.createElement("img");
    img.setAttribute("class", "lightbox-img");

    //passer name en paramètre pour construire le path vers le fichier
    console.log(this);
    const pictures = `assets/Sample Photos/${this.name}/${
      this.medias[this.index].image
    }`;

    //const video = `assets/Sample Photos/${photographer.name}/${enregMedia.video}`;
    img.src = pictures;

    //img.src = event.currentTarget.currentSrc; // savoir où on se situe dans le tableau des medias?

    lightboxContainer.appendChild(prev);
    lightboxContainer.appendChild(next);
    lightboxContainer.appendChild(close);
    //lightboxContainer.appendChild(title);
    lightbox.appendChild(img);

    lightboxContainer.style.display = "block";
  }

  nextImg() {
    //trouver quelle est l'image ciblée (src) et incrémenter plus 1
    //element.src?
  }
  //recherche dans le array medias de ce photographe les img par leur id et return index img
  calculateIndexById(id) {
    for (let i = 0; i < this.medias.length; i++) {
      if (this.medias[i].id == id) {
        this.index = i;
        break;
      }
    }
  }
}
