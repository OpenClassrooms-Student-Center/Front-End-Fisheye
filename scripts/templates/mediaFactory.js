export class MediaFactory{
    static createMediaElement(media, photographerName) {
        const mediaElement = media.image ? document.createElement('img') : document.createElement('video')
   

        mediaElement.classList.add(`photographers-works`);
        mediaElement.setAttribute(`src`, `assets/images/${photographerName}-photos/${ media.image || media.video }`);

        mediaElement.setAttribute(`tabindex`, `0`)
        mediaElement.setAttribute(`aria-label`, `${media.title} Cliquez pour une vue rapprochée`)
        
        return mediaElement  
 }
}  