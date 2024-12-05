export default class photographerPageMedia {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }
    //Fonction de la création du header de la page photographe
    createPhotographerMedia() {
    const mediaContainer = document.querySelector(".picture__container");
    const gallery = `
                <article class="gallery" aria-label="Exposition de plusieurs clichés pris par le photographe">
                ${this.medias.map(media => {
                    const mediaContent = media.image
                        ? ` <img class="gallery_thumbnail" src="./assets/images/photographers/sample Photos/${this.photographer.name}/${media.image}" alt="${media.alt}">`
                        : ` <video class="gallery_thumbnail" aria-label="${media.alt}">
                                <source src="./assets/images/photographers/sample Photos/${this.photographer.name}/${media.video}" type="video/mp4">
                            </video>`;
                return `
                                <section class="gallery__card">
                                    <a class="gallery__card--link" href="#" role="link" aria-label="Photo">
                                        <figure>${mediaContent}</figure>
                                    </a>
                                    <figcaption>
                                        <h2>${media.title}</h2>
                                            <div role="group" aria-label="bouton pour aimer et compteur des j'aime">
                                                <span class="nbLike" aria-label="Nombre de j'aime">${media.likes}</span> 
                                                <button class="btn__like" type="button" aria-label="J'aime" data-id="${media.id}">
                                                    <span class="fas fa-heart" aria-hidden="true"></span>
                                                </button>
                                            </div>
                                    </figcaption> 
                                </section>                            
                    </article>
                `;
                }).join("")}
                <aside>
                <p class="photographer__Likes">
                    <span class="photographer__likes--count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
                </aside>
            `;
            mediaContainer.innerHTML = gallery;
        return gallery
    }
}