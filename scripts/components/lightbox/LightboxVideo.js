export class LightboxVideo {
  constructor(videoLink, title) {
    this.videoLink = videoLink;
    this.title = title;
  }
  buildDOM() {
    const lightbox = `
            <video controls aria-label="${this.title}">
                <source src="${this.videoLink}" type="video/mp4">
                Désolé, la vidéo n'est pas supportée par votre navigateur 
            </video>
            <p>${this.title}</p>`;
    return lightbox;
  }
}
