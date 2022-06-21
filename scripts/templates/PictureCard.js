export { PictureCard }
class PictureCard {
    constructor(picture, photographer) {
        this.id = picture.id
        this.title = picture.title
        this.image = picture.image
        this.likes = picture.likes
        this.date = picture.date
        this.price = picture.price
        this.photographerId = picture.photographerId
        this.photographerName = photographer.name
    }

    getPictureCardDom() {
        const mediaItem = document.createElement('div')
        mediaItem.setAttribute('class', 'media__item')

        const image = document.createElement('img')

        const accessibleImageName = this.image.replace('.jpg', '')

        image.setAttribute(
            'src',
            `/assets/media/${this.photographerName}/${this.image}`
        )
        image.setAttribute('alt', `${accessibleImageName}, closeup view`)

        const spanTitle = document.createElement('span')
        spanTitle.textContent = this.title
        spanTitle.setAttribute('class', 'title')

        const spanLikes = document.createElement('span')
        spanLikes.textContent = this.likes
        spanLikes.setAttribute('class', 'likes')

        const iconLike = document.createElement('i')
        iconLike.setAttribute('class', 'fa-solid fa-heart icon')
        iconLike.setAttribute('picture-fa-transform', 'up-1')

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
