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

        const img = document.createElement('img')
        img.setAttribute('src', `${this.picture}`)

        const h2 = document.createElement('h2')
        h2.textContent = this.name

        const a = document.createElement('a')
        a.setAttribute(
            'href',
            `/photographer.html?photographerId=${this.id}`
        )
        a.setAttribute('aria-label', `${this.name}`)

        const p = document.createElement('p')

        const spanLocation = document.createElement('span')
        spanLocation.setAttribute('class', 'location')
        spanLocation.textContent = `${this.city}, ${this.country}`

        const spanTagline = document.createElement('span')
        spanTagline.setAttribute('class', 'tagline')
        spanTagline.textContent = `${this.tagline}`

        const spanPrice = document.createElement('span')
        spanPrice.setAttribute('class', 'price')
        spanPrice.textContent = `${this.price}/jour`

        a.appendChild(img)
        a.appendChild(h2)

        p.appendChild(spanLocation)
        p.appendChild(spanTagline)
        p.appendChild(spanPrice)

        article.appendChild(a)
        article.appendChild(p)

        return article
    }

    getPhotographerHeader() {
        const photographerHeader = document.querySelector(
            '.photographer_header'
        )

        const img = document.createElement('img')
        img.setAttribute('src', `${this.picture}`)
        img.setAttribute('class', 'photographer_header__img')
        img.setAttribute('alt', `${this.name}`)

        const h2 = document.createElement('h2')
        h2.setAttribute('class', 'name')
        h2.textContent = this.name

        const spanLocation = document.createElement('span')
        spanLocation.setAttribute('class', 'location')
        spanLocation.textContent = `${this.city}, ${this.country}`

        const spanTagline = document.createElement('span')
        spanTagline.setAttribute('class', 'tagline')
        spanTagline.textContent = `${this.tagline}`

        const p = document.createElement('p')

        p.appendChild(h2)
        p.appendChild(spanLocation)
        p.appendChild(spanTagline)
        p.setAttribute('class', 'photographer_header__content')

        photographerHeader.appendChild(p)
        photographerHeader.appendChild(img)
    }
}
