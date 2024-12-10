export const displayLightbox = medias => {

    const lightboxWrapper = document.getElementById('lightboxWrapperJs');
    const btnClose = document.getElementById('closelightBoxJS');
    const btnPrevious = document.getElementById('previousMediaJS');
    const btnNext = document.getElementById('nextMediaJS');
    const lightboxMedia = document.querySelector('.lightbox__container--media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery__card--link'));
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0;


    function lightboxTemplate() {        
            const currentMedia = mediasList[currentIndex];            
            lightboxMedia.innerHTML = `
                    ${currentMedia._image ? `
                    <img src="../../assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._image)}" alt="${currentMedia._alt || ''}">` : 
                    `<video controls aria-label="${currentMedia._alt || ''}"><source src="../../assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._video)}" type="video/mp4"></video>`}

                    <figcaption>${currentMedia._title || ''}</figcaption>
                `;            
                return lightboxMedia;
    };    
    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const header = document.querySelector('header');
            const main = document.getElementById('main');            
            const mediaId = media.dataset.media;        
            const mediaIndex = mediasList.findIndex(media => media._id == mediaId);                       
                currentIndex = mediaIndex;                
                lightboxWrapper.style.display = 'flex';
                header.style.display = 'none';
                main.style.visibility = 'hidden';
                main.style.height = '0'; 
                main.style.width = '0';               
                btnClose.focus();
                lightboxTemplate();                            
        });
    });
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
    };
    btnClose.addEventListener('click', closeLightbox);
    btnPrevious.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediasList.length - 1;
        lightboxTemplate();
    });
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < mediasList.length - 1) ? currentIndex + 1 : 0;
        lightboxTemplate();
    });
};