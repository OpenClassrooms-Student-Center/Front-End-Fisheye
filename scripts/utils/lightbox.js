

function createMediaElement(photographer, media) {
    // Remplacer les tirets par des espaces et réduire les espaces multiples à un seul espace
    const photographerNameFormatted = photographer._name.replace(/-/g, ' ').replace(/\s+/g, ' ');
    const photographerNameEncoded = encodeURIComponent(photographerNameFormatted);

    // Générer le chemin d'accès au média
    const mediaPath = media._image
        ? `/assets/images/FishEye_Photos/Sample Photos/${photographerNameEncoded}/${encodeURIComponent(media._image)}`
        : `/assets/images/FishEye_Photos/Sample Photos/${photographerNameEncoded}/${encodeURIComponent(media._video)}`;

    // Créer l'élément HTML pour le média (image ou vidéo)
    const mediaElement = media._image
        ? `<img src="${mediaPath}" alt="${media._title}" class="gallery__card--media">`
        : `<video class="gallery__card--media" alt="${media._title}">
                <source src="${mediaPath}" type="video/mp4">
            </video>`;

    return mediaElement;
}
export function lightBox(photographer, media) {
    const lightBoxMedia = document.querySelector('.lightbox__container--media');
    lightBoxMedia.innerHTML = createMediaElement(photographer, media);
}
/*export  function nextLightBoxMedia() {
const btn = document.getElementById('nextMediaJS');
    
  }*/
 /*export  function previousLightBoxMedia() {
 const btn = document.getElementById('previousMediaJS');
    
  }*/
  export  function closeLightBox() {
    const lightBox = document.getElementById('contact__lightBox');
    const lightboxWrapper = document.getElementById('lightboxWrapper');
    const btn = document.getElementById('closelightBoxJS');
    btn.addEventListener('click', () => {
      lightBox.style.display = 'none';
      lightboxWrapper.style.display = 'none';
    });
  }