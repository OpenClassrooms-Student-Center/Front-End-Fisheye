export default class PhotographerPageMedia {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;        
    }
    //Méthode de la création du galerie de la page photographe
    /**
     * @description - Crée le contenu media de la page photographe
     * @returns {string} - Retourne la galerie des médias du photographe
     */
    createPhotographerMedia() {
        const mediaContainer = document.querySelector(".picture__container");    
        const gallery = `                           
                    ${this.medias.map(media => {                                                                       
                        const photographerNameFormatted = this.photographer._name.replace(/-/g, ' ');                       
                        const photographerNameEncoded = encodeURIComponent(photographerNameFormatted);                                            
                        const mediaPath = media._image
                    ? `./assets/images/FishEye_Photos/Sample_Photos/${photographerNameEncoded}/${encodeURIComponent(media._image)}`
                    : `./assets/images/FishEye_Photos/Sample_Photos/${photographerNameEncoded}/${encodeURIComponent(media._video)}`;                                                   
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
                                <figcaption role="group">
                                <h2>${media._title}</h2>
                                    <div class="container__PictureLike" tabindex="0" role="treeitem">
                                    <span class="nbLike">${media._likes}</span> 
                                    <button class="btn__like" type="button" aria-label="J'aime" data-id="${media._id}">
                                        <span class="fas fa-heart" aria-hidden="true"></span>
                                    </button>
                                    </div>
                                </figcaption> 
                            </section>                                                        
                `;
            }).join("")}`;
            mediaContainer.innerHTML = gallery;
                        const presenteAside = document.getElementById("TotalLikeContainerJS")
                        if(!presenteAside){
                            const aside = `
                                            <section id="TotalLikeContainerJS" class="photographer__aside" tabindex="0" role="tabpanel" aria-live="polite">
                                            <div  class="photographer__Likes">  
                                                <span id="Total__Like" class="photographer__likes--count"></span>
                                                <span class="Like__Heart" aria-hidden="true"></span>
                                            </div>
                                            <span id="photographerPrice" >${this.photographer._price}€/jour</span>
                                            </section>
                                            ` 
                            mediaContainer.insertAdjacentHTML('afterend', aside);
                            ;}        
        return gallery;
    }
}