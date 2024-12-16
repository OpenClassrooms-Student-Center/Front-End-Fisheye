export default class photographerPageMedia {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;        
    }
    //Méthode de la création du header de la page photographe
    createPhotographerMedia() {
        const mediaContainer = document.querySelector(".picture__container");    
        const gallery = `                           
                    ${this.medias.map(media => {                                                                       
                        const photographerNameFormatted = this.photographer._name.replace(/-/g, ' ');
                        const photographerNameEncoded = encodeURIComponent(photographerNameFormatted);
                        const mediaPath = media._image
                    ? `/assets/images/FishEye_Photos/Sample_Photos/${photographerNameEncoded}/${encodeURIComponent(media._image)}`
                    : `/assets/images/FishEye_Photos/Sample_Photos/${photographerNameEncoded}/${encodeURIComponent(media._video)}`;                                
                        const mediaElement = media._image
                        ? `<img src="${mediaPath}" alt="${media._title}" class="gallery__card--media">` 
                        : `<video class="gallery__card--media" alt="${media._title}">
                        <source src="${mediaPath}" type="video/mp4">
                        </video>`;
                        return`
                            <section class="gallery__card">
                                <a class="gallery__card--link" href="#" role="link" data-media="${media._id}" aria-label="Photo">
                                <figure>${mediaElement}</figure>
                                </a>
                                <figcaption>
                                <h2>${media._title}</h2>
                                    <div role="group" aria-label="bouton pour aimer et compteur des j'aime">
                                    <span class="nbLike" aria-label="Nombre de j'aime">${media._likes}</span> 
                                    <button class="btn__like" type="button" aria-label="J'aime" data-id="${media._id}">
                                        <span class="fas fa-heart" aria-hidden="true"></span>
                                    </button>
                                    </div>
                                </figcaption> 
                            </section>                                                        
                `;
            }).join("")}`;

        const aside = `
            <aside>
            <div class="photographer__Likes">
                <span id="Total__Like" class="photographer__likes--count"></span>
                <span class="Like__Heart" aria-hidden="true"></span>
            </div>
            <span id="photographerPrice" >${this.photographer._price}€/jour</span>
            </aside>
            `;

        mediaContainer.innerHTML = gallery;
        mediaContainer.insertAdjacentHTML('afterend', aside);
            mediaContainer.innerHTML = gallery;            
        return gallery
    }
}