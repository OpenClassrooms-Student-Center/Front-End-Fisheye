export default class photographerPageMedia {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }
    //Fonction de la création du header de la page photographe
    createPhotographerMedia() {
        const mediaContainer = document.querySelector(".picture__container");
            const gallery = `
            <section class="gallery" aria-label="Exposition de plusieurs clichés pris par le photographe">
            ${this.medias.map(media => {
                const mediaContent = media.image
                    ? ` <img class="gallery_thumbnail" src="./assets/images/photographers/sample Photos/${this.photographer.name}/${media.image}" alt="${media.alt}">`
                    : ` <video class="gallery_thumbnail" aria-label="${media.alt}">
                            <source src="./assets/images/photographers/sample Photos/${this.photographer.name}/${media.video}" type="video/mp4">
                        </video>`;
                return `
                <div class="gallery__card">
            </section>
            `
        return //something;
    }
}