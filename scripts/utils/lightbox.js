class Lightbox {

    static init() {
        const medias = Array.from(document.querySelectorAll('#medias_section img, #medias_section video'));
        const gallery = medias.map(media => media.getAttribute('src'))
  
        medias.forEach(media => media.addEventListener('click', e => {
            const mediaURL = e.currentTarget.getAttribute('src');
            new Lightbox(mediaURL, gallery);
            }))
    }
  
    constructor(url, images) {
        this.buildDOM();
        this.url = url;
        this.images = images;
        this.loadImage(url);
    
        document.querySelector('#main').appendChild(this.divLightbox);
        this.keyboardAcces = this.keyboardAcces.bind(this);
        document.addEventListener('keyup', this.keyboardAcces);
    }
  
    loadImage(url) {
        const container = this.divLightbox.querySelector('.lightbox__container');
        const image = document.createElement('img');

        container.innerHTML = '';
        container.appendChild(image);
        image.setAttribute("src", url);
    }
  
    keyboardAcces(e) {
        if (e.key === 'Escape') {
            this.close(e);
        } else if (e.key === 'ArrowLeft') {
            this.prev(e);
        } else if (e.key === 'ArrowRight') {
            this.next(e);
        }
    }
  
    close (e) {
        this.divLightbox.classList.add('fade-out');
        window.setTimeout(() => {
            this.divLightbox.parentElement.removeChild(this.divLightbox);
        }, 500)
        document.removeEventListener('keyup', this.keyboardAcces);
    }
  
    next (e) {
        this.url = document.querySelector('.lightbox__container img').getAttribute('src');
        let i = this.images.findIndex(image => image === this.url);
        if (i === this.images.length - 1) {
            i = -1
        }      
        i++;
        this.loadImage(this.images[i]);
    }
  
    prev (e) {
        this.url = document.querySelector('.lightbox__container img').getAttribute('src');
        let i = this.images.findIndex(image => image === this.url);
        if (i === 0) {
            i = this.images.length;
        }
        i--;
        this.loadImage(this.images[i]);
    }
  
    buildDOM () {
        this.divLightbox = document.createElement('div');
        this.divLightbox.classList.add('lightbox');
        this.divLightbox.innerHTML = `<button class="lightbox__close" aria-label="Fermer la visionneuse"></button>
            <button class="lightbox__next" aria-label="Média suivant"></button>
            <button class="lightbox__prev" aria-label="Média précédent"></button>
            <div class="lightbox__container"></div>`;
        this.divLightbox.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
        this.divLightbox.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
        this.divLightbox.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
    }
  
  }  