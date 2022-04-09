export default class LightBox {
    constructor() {
        this.currentIndex = 0;
    }
    // Initialisation lightbox sur le click + navigation
    lightboxOpen(mediaItems, mediaName) {
        let selectMedias = document.querySelectorAll('.ph-media');
        console.log(selectMedias);
        selectMedias.forEach((media, index) => media.addEventListener("click", () => {
            let lightBoxMedia = document.getElementById('lightbox-media');
            let lightBoxName = document.getElementById('lightbox-name');
            let mediaDisplay = mediaItems[index];
            let nameDisplay = mediaName[index];
            document.getElementById('lightbox').style.display = 'block';
            lightBoxMedia.innerHTML = `${mediaDisplay}`;
            lightBoxName.innerHTML = `${nameDisplay}`;
            this.currentIndex = index;
        }))

        this.close();
        return this;
    }
 
    // Fermeture de la lightbox
    close() {
        document.querySelector('.close-lightbox').addEventListener('click', () => {
            let lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
        })
    }
  
    
}