setTimeout(function () {
  /**
   * @property {HTMLElement} element
   * @property {string[]} images - The gallery of images
   * @property {string} url - Displayed image url
   */

  class Lightbox {
    static init() {
      const links = Array.from(
        document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
      );

      const gallery = links.map((link) => link.getAttribute("href"));

      links.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("href"), gallery);
        })
      );
    }

    /**
     *
     * @param {string} src - The image source
     * @param {string[]} images - The gallery of images
     */
    constructor(url, images) {
      this.element = this.buildDom(url);
      this.images = images;
      this.onKeyUp = this.onKeyUp.bind(this);
      document.body.appendChild(this.element);
      document.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp(e) {
      if (e.key === "Escape") {
        this.close(e);
      } else if (e.key === "ArrowRight") {
        this.next(e);
      } else if (e.key === "ArrowLeft") {
        this.prev(e);
      }
    }

    /**
     * Ferme la lightbox
     * @param {mouseEvent | KeyboardEvent} e
     */
    close(e) {
      e.preventDefault();
      this.element.classList.add("fadeOut");
      window.setTimeout(() => {
        this.element.remove(this.element);
      }, 500);
      document.removeEventListener("keyup", this.onKeyUp);
    }

    /**
     * @param {string} url URL de l'image
     */
    loadImage(url) {
      this.url = null;
      if(url.includes('.jpg')){

      const image = new Image();
      const container = this.element.querySelector(".lightbox_container");
      container.innerHTML = "";

      image.onload = () => {
        container.appendChild(image);
        this.url = url;
      };
      image.src = url;
    }else if(url.includes('.mp4')){
      const video = document.createElement('video');
      const container = this.element.querySelector(".lightbox_container");
      container.innerHTML = "";

      video.setAttribute('autoplay', true);
      video.setAttribute('loop', true);
      video.setAttribute('controls', true);

      const source = document.createElement('source');
      source.src = url;
      source.type = 'video/mp4';
      video.appendChild(source);
      container.appendChild(video);
      this.url = url;
    }

    }

    /**
     * @param {MouseEvent|KeyboardEvent} e
     */
    next(e) {
      e.preventDefault();
      let i = this.images.findIndex(image => image === this.url);
      if (i === this.images.length - 1) {
        i = -1;
      }
      this.loadImage(this.images[i + 1]);
    }

    /**
     * @param {MouseEvent|KeyboardEvent} e
     */
    prev(e) {
      e.preventDefault();
      let i = this.images.findIndex(image => {
        return image === this.url;
      });
      if (i === 0) {
        i = this.images.length;
      }
      this.loadImage(this.images[i - 1]);
    }

    /**
     * @param {string} src - The image source
     * @return (htmlElement)
     */

    buildDom(url) {
      const dom = document.createElement("div");
      dom.classList.add("lightbox");
      dom.innerHTML = `
       <button aria-label="Fermer la lightbox" title="Fermer" class="lightbox_close">Fermer</button>
       <button aria-label="Media suivant" title="Fleche suivante" class="lightbox_next">Suivant</button>
       <button aria-label="Media précédent" title="Fleche précédente" class="lightbox_prev">Précédent</button>
       <div class="lightbox_container">
         <img src="${url}" alt="#">
       </div>
    `;
      dom
        .querySelector(".lightbox_close")
        .addEventListener("click", this.close.bind(this));
      dom
        .querySelector(".lightbox_next")
        .addEventListener("click", this.next.bind(this));
      dom
        .querySelector(".lightbox_prev")
        .addEventListener("click", this.prev.bind(this));
      return dom;
    }
  }

  Lightbox.init();

  console.log("lightbox.js loaded");
}, 1000);
