class PhotographCard {
    constructor(photographer) {
        this._photographer = photographer
    }

    
    getPhotographCardDOM(){

        const photographCard = `
            <div>
            <h2>${this._photographer.name}</h2>
            <p>
                <strong>${this._photographer.city}, ${this._photographer.country}</strong>
                <br/>
                ${this._photographer.tagline}
            </p> 
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div><img alt="${this._photographer.name}" src="${this._photographer.portrait}"/></div>
        `

        return photographCard
    }

}

class MediaCard {
    constructor(media,photographer) {
        this._media = media
        this._photographer = photographer
    }
    
    getMediaCardDOM(){
        const article = document.createElement('article');
        let userCard=``
        if(this._media.image){

         userCard = `
            <img alt="${this._media.title}" src="/assets/photographers/${this._photographer.name.split(" ",1)}/${this._media.image}"/>
            <div>
            <h2>${this._media.title}</h2>
            <p>    
                ${this._media.likes}
            </p> 
            </div>
        `
        }
        else{
            
            const ext = this._media.video.split(".",2)[1]
            userCard = `
            <video controls>
                <source src="/assets/photographers/${this._photographer.name.split(" ",1)}/${this._media.video}" type="video/${ext}">
            </video>
            <div>
            <h2>${this._media.title}</h2>
            <p>    
                ${this._media.likes}
            </p> 
            </div>
        `
        }
        article.innerHTML = userCard
        return article
    }

}