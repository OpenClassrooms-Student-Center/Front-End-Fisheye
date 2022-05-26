class PictureCard {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        this.photographerName = getPhotographerName()
    }

    getPictureCardDom() {
        const mediaItem = document.createElement('div')
        mediaItem.setAttribute('class', 'media__item')

        const image = document.createElement('img')

        image.setAttribute(
            'src',
            `/assets/media/${this.photographerName}/${this.image}`
        )

        const spanTitle = document.createElement('span')
        spanTitle.textContent = this.title
        spanTitle.setAttribute('class', 'title')

        const spanLikes = document.createElement('span')
        spanLikes.textContent = this.likes
        spanLikes.setAttribute('class', 'likes')

        const iconLike = document.createElement('i')
        iconLike.setAttribute('class', 'fa-solid fa-heart icon')
        iconLike.setAttribute('data-fa-transform', 'up-1')

        const p = document.createElement('p')
        p.setAttribute('class', 'content')
        const likeDiv = document.createElement('div')
        likeDiv.setAttribute('class', 'subContent')

        p.appendChild(spanTitle)
        likeDiv.appendChild(spanLikes)
        likeDiv.appendChild(iconLike)
        p.appendChild(likeDiv)
        mediaItem.appendChild(image)
        mediaItem.appendChild(p)

        return mediaItem
    }
}
