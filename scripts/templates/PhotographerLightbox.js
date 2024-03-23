import Image from "../models/Image.js";
import Video from "../models/Video.js";

export default class PhotographerLightbox {
    constructor(medias) {
        this.medias = medias;
        this.currentIndex = 0; // Index du média actuel
    }

    displayCurrentMedia() {
        const media = this.medias[this.currentIndex];
        const lightboxMediaContainer = document.querySelector('.lightbox_media');
        lightboxMediaContainer.innerHTML = ''; 
    
        let mediaElement;
        
        if (media instanceof Image) {
            mediaElement = `<img src="${media.src}" alt="${media.title}"/>` +
                           `<h3 class="media-title">${media.title}</h3>`; 
        } else if (media instanceof Video) {
            mediaElement = `<video controls><source src="${media.src}" type="video/mp4"></video>` +
                           `<h3 class="media-title">${media.title}</h3>`;
        }
    
        lightboxMediaContainer.innerHTML = mediaElement;
    }

    
closeLightbox() {
    const lightboxModal = document.querySelector('.lightbox_modal');
    lightboxModal.style.display = 'none'; 
    const lightboxMediaContainer = document.querySelector('.lightbox_media');
    lightboxMediaContainer.innerHTML = '';
}
    attachEventListeners() {
        document.querySelector('.lightbox_prev').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.lightbox_next').addEventListener('click', () => this.navigate(1));
        document.querySelector('.lightbox_close').addEventListener('click', () => this.closeLightbox());
        this.setupMediaLinks();      

    }

    setupMediaLinks() {
        document.querySelectorAll('.media_link').forEach((link, index) => {
            link.removeEventListener('click', this.handleMediaLinkClick); 
            link.addEventListener('click', (e) => this.handleMediaLinkClick(e, index));
        });
    }

    handleMediaLinkClick(e, index) {
        e.preventDefault();
        this.currentIndex = index;
        this.displayCurrentMedia();
        document.querySelector('.lightbox_modal').style.display = 'block';
    }

    navigate(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.medias.length - 1;
        else if (this.currentIndex >= this.medias.length) this.currentIndex = 0;
        this.displayCurrentMedia();
    }

    updateMedias(medias) {
        this.medias = medias;
        this.setupMediaLinks(); 
    }

    initLightbox() {
        this.attachEventListeners();
    }
}