class PhotographCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    
    getPhotographCardDOM(){

        const photographCard = `
            <div aria-label="photographe ${this._photographer.name} de ${this._photographer.city}, ${this._photographer.country}">
            <h2>${this._photographer.name}</h2>
            <p>
                <strong>${this._photographer.city}, ${this._photographer.country}</strong>
                <br/>
                ${this._photographer.tagline}
            </p> 
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div><img alt="${this._photographer.name}" src="${this._photographer.portrait}"/></div>
        `;

        return photographCard;
    }

}

class MediaCard {
    constructor(media,photographer) {
        this._media = media;
        this._photographer = photographer;
    }
    
    getMediaCardDOM(e){
        const article = document.createElement("article"); 
        article.classList = `article-${e}`;
        let userCard="";
        if(this._media.image){

         userCard = `
            <img alt="${this._media.title}" src="/assets/photographers/${this._media.photographerId}/${this._media.image}" onclick="lightboxOn(${e})" aria-label="image, cliquer pour agrandire"/>
            <div>
            <h2>${this._media.title}</h2>
            <p class="like-${e}">    
               <span class="nbrLike-${e}"> ${this._media.likes} </span><i class="fa-regular fa-heart" onclick="like(${e})"></i>
            </p> 
            </div>
        `;
        }
        else{
            
            const ext = this._media.video.split(".",2)[1];
            userCard = `
            <video onclick="lightboxOn(${e})" aria-label="Vidéo, cliquer pour lire">
                <source src="/assets/photographers/${this._media.photographerId}/${this._media.video}" type="video/${ext} ">
                <p>Votre navigateur ne prend pas en charge les vidéos</p>
            </video>
            <div>
            <h2>${this._media.title}</h2>
            <p class="like-${e}">    
               <span class="nbrLike-${e}"> ${this._media.likes} </span><i class="fa-regular fa-heart" onclick="like(${e})"></i>
            </p> 
            </div>
        `;
        }
        article.innerHTML = userCard;
        return article;
    }

}