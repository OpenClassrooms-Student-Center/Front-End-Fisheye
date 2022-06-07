class PriceAndLikesCard {
    constructor(likesData) {
        this.price = this.getPhotographerPrice()
        this.likes = likesData
    }

    getPhotographerPrice() {
        const link = window.location.search
        const searchParams = new URLSearchParams(link)

        // Retourne le prix du photographe contenu dans le lien
        return parseInt(searchParams.get('photographerPrice'), 10)
    }
    
    getPriceAndLikesDom() {
        const div = document.createElement('div')
        div.setAttribute('class', 'priceAndLikes')

        const spanLikes = document.createElement('span')
        spanLikes.textContent = `${this.likes}`
        spanLikes.setAttribute('class', 'likes')

        const spanPrice = document.createElement('span')
        spanPrice.textContent = `${this.price}€ / jour`
        spanPrice.setAttribute('class', 'price')

        const iconLike = document.createElement('i')
        iconLike.setAttribute('class', 'fa-solid fa-heart icon icon--black')
        iconLike.setAttribute('data-fa-transform', 'up-0.75')

        const likeDiv = document.createElement('div')
        likeDiv.setAttribute('class', 'likeContent')

        likeDiv.appendChild(spanLikes)
        likeDiv.appendChild(iconLike)
        div.appendChild(likeDiv)
        div.appendChild(spanPrice)

        return div
    }
}
