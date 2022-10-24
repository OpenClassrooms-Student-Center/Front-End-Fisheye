// -------------------------- //
// ---> Constructor ou Model <--- //
export class Photographer {

    baseImage = 'assets/photographers'

    constructor(data) {
        this.name = data.name
        this.portrait = data.portrait
        this.id = data.id
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price


    }

    /**
     * 
     * @param {*} property 
     * @returns 
     */
    get(property) {
        console.log(property)
        if (isset(this[property])) {
            return this[property]
        }
    }


    /**
     * 
     * @returns 
     * card template
     */
    getUserCardDOM() {
        let card = `
            <article>
                <a href="photographer.html?id=${this.id}" aria-label='${this.name}'>
                    <img src='${this.baseImage}/${this.portrait}' alt='photo de profil de ${this.name}'>
                    <h2>${this.name}</h2>
                </a>
                <div>
                    <p id='city'>${this.city}, ${this.country}</p>
                    <p>${this.tagline}</p>
                    <small>${this.price}€/jour</small>
                </div>
            </article>
        `
        return card
    }
    /**
     * 
     * @returns 
     * header template
     */
    getPhotographerHeaderTemplate() {
        let header = `
            <div id='presentation'>
                <div>
                    <h1 id='title-3' class='prenom-test'>${this.name}</h1>
                    <p>${this.city}, ${this.country}</p>
                    <small>${this.tagline}</small>
                </div>
                <button type="button" id="open-contact" class="contact_button" aria-label="Contacter ${this.name}">Contactez-moi</button>
                <img id='photo' src='${this.baseImage}/${this.portrait}' alt='photo de profil de ${this.name}'>
            </div>
        `

        return header
    }


    getCardInfo() {
        let cardInfo = `<p>${this.price}€/jour</p>`
        return cardInfo
    }

}

