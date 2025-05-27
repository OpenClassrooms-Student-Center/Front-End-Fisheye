/**
 * 
 * @param {*} medias 
 * @description affiche le lightbox
 * @returns {HTMLElement} lightboxWrapper
 * 
 */
export const displayLightbox = (medias) => {
    const skipLinkContainer = document.getElementById('skipLinkContainer');
    const skipLink = document.getElementById('skipLink');
    const header = document.querySelector('header');
    const main = document.getElementById('main');    
    const lightboxWrapper = document.getElementById('lightboxWrapperJs');
    const btnClose = document.getElementById('closelightBoxJS');
    const btnPrevious = document.getElementById('previousMediaJS');
    const btnNext = document.getElementById('nextMediaJS');
    const lightboxMedia = document.querySelector('.lightbox__container--media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery__card--link'));
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0;

/**
 * @param {HTMLElement} lightboxWrapper
 * @returns {HTMLElement} lightboxMedia
 * @description affiche le media dans le lightbox
 */
    const lightboxTemplate = () => {        
        const currentMedia = mediasList[currentIndex];            
        lightboxMedia.innerHTML = `
                ${currentMedia._image ? `
                <img src="./assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._image)}" alt="${currentMedia._alt || ''}">` : 
                `<video controls aria-label="${currentMedia._alt || ''}"><source src="./assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._video)}" type="video/mp4"></video>`}

                <figcaption>${currentMedia._title || ''}</figcaption>
            `;            
        return lightboxMedia;
    };    
    
    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
                  
            const mediaId = media.dataset.media;        
            const mediaIndex = mediasList.findIndex(media => media._id == mediaId);                       
            currentIndex = mediaIndex;
            skipLinkContainer.style.display = 'block';                
            skipLinkContainer.setAttribute('aria-hidden', 'false');
            skipLink.setAttribute('aria-hidden', 'false');                                
            lightboxWrapper.setAttribute('aria-hidden', 'false');
            main.setAttribute('aria-hidden', 'true');
            lightboxWrapper.style.display = 'flex';                                         
            header.style.display = 'none';
            main.style.visibility = 'hidden';
            main.setAttribute('aria-hidden', 'true');
            main.style.height = '0'; 
            main.style.width = '0';              
            btnClose.focus();
            lightboxTemplate();
                                             
        });
    });
    /**
     * @function closeLightbox
     * @description ferme le lightbox
     */
    const closeLightbox = () => {          
        lightboxWrapper.style.display = 'none';
        lightboxWrapper.setAttribute('aria-hidden', 'true');
        skipLinkContainer.setAttribute('aria-hidden', 'true');        
        skipLink.setAttribute('aria-hidden', 'true');
        header.style.display = 'flex';
        main.style.visibility = 'visible';
        main.setAttribute('aria-hidden', 'false');
        main.style.height = 'auto'; 
        main.style.width = 'auto';
        skipLinkContainer.style.display = 'none';            
    };
    
    skipLink.addEventListener('click', closeLightbox);
    btnClose.addEventListener('click', closeLightbox);
    btnClose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            closeLightbox();
        }
    });          
    
    btnPrevious.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediasList.length - 1;
        lightboxTemplate();         
    });
    
    btnPrevious.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediasList.length - 1;
            lightboxTemplate(); 
        }
    });
    
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < mediasList.length - 1) ? currentIndex + 1 : 0;
        lightboxTemplate(); 
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });    
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex < mediasList.length - 1) ? currentIndex + 1 : 0;
            lightboxTemplate();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediasList.length - 1;
            lightboxTemplate();
        }
    });
};