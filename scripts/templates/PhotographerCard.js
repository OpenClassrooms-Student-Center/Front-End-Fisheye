export { PhotographerCard }
class PhotographerCard {
    constructor(photographer) {
        this.name = photographer.name
        this.id = photographer.id
        this.city = photographer.city
        this.country = photographer.country
        this.tagline = photographer.tagline
        this.price = photographer.price
        this.portrait = photographer.portrait
        this.picture = `assets/photographers/${this.portrait}`
    }

    getUserCardDOM() {
        const article = document.createElement('article')

        article.innerHTML = `
            <a
                href="/photographer.html?photographerId=${this.id}"
                aria-label="${this.name}" 
            >
                <img src="${this.picture}">
                <h2>${this.name}</h2>
            </a>
            <p>
                <span class="location">${this.city}, ${this.country}</span>
                <span class="tagline">${this.tagline}</span>
                <span class="price">${this.price}/jour</span>
            </p>
        `
        
        return article
    }

    getPhotographerHeader() {
        const photographerHeader = document.querySelector(
            '.photographer_header'
        )

        const img = document.createElement('img')
        const p = document.createElement('p')

        img.setAttribute('src', `${this.picture}`)
        img.setAttribute('alt', `${this.name}`)
        img.setAttribute('class', 'photographer_header__img')

        p.setAttribute('class', 'photographer_header__content')
        p.innerHTML = `
            <h2 class="name">${this.name}</h2>
            <span class="location">${this.city}, ${this.country}</span>
            <span class="tagline">${this.tagline}</span>
        `

        photographerHeader.appendChild(p)
        photographerHeader.appendChild(img)
    }
}
