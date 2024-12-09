export const displayLightbox = medias => {

    const lightboxWrapper = document.getElementById('lightboxWrapper');
    const btnClose = document.getElementById('closelightBoxJS');
    const btnPrevious = document.getElementById('previousMediaJS');
    const btnNext = document.getElementById('nextMediaJS');
    const lightboxMedia = document.querySelector('.lightbox__container--media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery__card--link'));
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0; 

    console.log("mediasList", mediasList);
    console.log("mediaProvider", mediaProvider);

    mediaProvider.forEach(media => {
      console.log("mediaProvider ID", media.dataset.media);
  });

    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            console.log("mediaId", mediaId);
            console.log("mediasList IDs", mediasList.map(media => media._id));
            const mediaIndex = mediasList.findIndex(media => media._id == mediaId);
            console.log("mediaIndex", mediaIndex);
            if (mediaIndex !== -1) {
                currentIndex = mediaIndex;
                lightboxWrapper.style.display = 'flex';
                //btnClose.focus();
                lightboxTemplate();
            } else {
                console.error("mediaIndex est invalide :", mediaIndex);
            }
        });
    });

    const lightboxTemplate = () => {
        if (mediasList && mediasList.length > 0 && currentIndex >= 0 && currentIndex < mediasList.length) {
            const currentMedia = mediasList[currentIndex];
            if (currentMedia) {
                lightboxMedia.innerHTML = `
                    ${currentMedia._image ? `
                    <img src="../../assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._image)}" alt="${currentMedia._alt || ''}">` : 
                    `<video controls aria-label="${currentMedia._alt || ''}"><source src="../../assets/images/FishEye_Photos/Sample_Photos/${photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ')}/${encodeURIComponent(currentMedia._video)}" type="video/mp4"></video>`}

                    <figcaption>${currentMedia._title || ''}</figcaption>
                `;
            } else {
                console.error("currentMedia est indéfini à l'index :", currentIndex);
            }
        } else {
            console.error("mediasList est invalide ou currentIndex est hors limites");
        }
    };

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