class PhotographerCard{
    constructor(photographer){
        this._photographer = photographer
    }

    createPhotographerCard(){
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photographer-card-wrapper')
    
        const PhotographerCard = `
        <div>
        <a href="photographer.html?id=${this._photographer.id}"> 
            <img alt="${this._photographer.name}" src="/assets/photographers/${this._photographer.portrait}"/>
            <h2>${this._photographer.name}</h2>
            </a>
            <h3>${this._photographer.city}, ${this._photographer.country}</h3>
            <p>${this._photographer.tagline}</p>
            <span>${this._photographer.price}€/jour</span>

        </div>
        
        
        `
        $wrapper.innerHTML = PhotographerCard
        return $wrapper
    }
}

