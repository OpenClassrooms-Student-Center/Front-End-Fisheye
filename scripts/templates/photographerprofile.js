class PhotographerProfile{
    constructor(photographer){
        this._photographer = photographer
        
    }

    createPhotographerProfile(){
        const $wrapperProfile = document.createElement('div')
        $wrapperProfile.classList.add('photographer-profile-wrapper')

        const photographerProfile = `
            <div>
                <h1>${this._photographer.name}</h1>
                <h2>${this._photographer.city}, ${this._photographer.country}</h2>
                <p>${this._photographer.tagline}<p>
            </div>
            <div><button class="contact_button" onclick="displayModal()">Contactez-moi</button></div>
            <div>
                <div class="photographer-profile-img">
                    <img alt="${this._photographer.name}" src="/assets/photographers/${this._photographer.portrait}"/>
                </div>
            </div>
            <div class="price"><p id="totalLike"></p><p><i class="fa-solid fa-heart"></i></p><p>${this._photographer.price}€ / jour</p></div>
            
        
        
        `
        $wrapperProfile.innerHTML = photographerProfile
        return $wrapperProfile
    }
    
}