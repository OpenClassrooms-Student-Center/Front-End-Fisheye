export default class LightBox {
  constructor(){
      this.currentIndex = 0
  }
    // Initialisation lightbox sur le click + navigation
    lightboxOpen(mediaItems, mediaName) {
        let selectMedias = document.querySelectorAll('.ph-media');
        selectMedias.forEach((media,index) => media.addEventListener("click", () => {
            let lightBoxMedia = document.getElementById('lightbox-media');
            let lightBoxName = document.getElementById('lightbox-name');
            let mediaDisplay = mediaItems[index];
            let nameDisplay = mediaName[index];
            let openLightbox = document.querySelector('.lightbox');
            openLightbox.classList.add('show');
            lightBoxMedia.innerHTML = `${mediaDisplay}`;
            lightBoxName.innerHTML = `${nameDisplay}`;
        }))
        this.previous(mediaItems, mediaName);
        this.next(mediaItems, mediaName);
        this.close();
        return this;
    }
 
    // Fermeture de la lightbox
    close() {
        document.querySelector('.close-lightbox').addEventListener('click', () => {
            let lightbox = document.querySelector('.lightbox');
            lightbox.classList.remove('show');
        })
    }
    // Média précédent
    previous(mediaItems, mediaName) {
        let previous = document.getElementById('previous')
        previous.addEventListener('click', () => {
            this.currentIndex -= 1;
            //si l'index est inferieure a 0 on la reaffecte la valeur du dernier element des medias
            if (this.currentIndex < 0) {
                this.currentIndex = mediaItems.length - 1;
            }
            let lightBoxMedia = document.getElementById('lightbox-media');
            let lightBoxName = document.getElementById('lightbox-name');
            let mediaDisplay = mediaItems[this.currentIndex];
            let nameDisplay = mediaName[this.currentIndex];
            lightBoxMedia.innerHTML = `${mediaDisplay}`;
            lightBoxName.innerHTML = `${nameDisplay}`;
        })
    }
    // Média suivant
    next(mediaItems, mediaName) {
        let next = document.getElementById('next')
        next.addEventListener('click', () => {
            this.currentIndex += 1;
            //si l'index est au dernier element des medias, on reinitialise sa valeur 
            if (this.currentIndex > mediaItems.length - 1) {
                this.currentIndex = 0;
            }
            let lightBoxMedia = document.getElementById('lightbox-media');
            let lightBoxName = document.getElementById('lightbox-name');
            let mediaDisplay = mediaItems[this.currentIndex];
            let nameDisplay = mediaName[this.currentIndex];
            lightBoxMedia.innerHTML = `${mediaDisplay}`;
            lightBoxName.innerHTML = `${nameDisplay}`;
        })
    }
  
    
}