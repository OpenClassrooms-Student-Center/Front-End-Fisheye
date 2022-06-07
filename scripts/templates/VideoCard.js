class VideoCard {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        this.photographerName = this.getPhotographerName()
    }

    getPhotographerName() {
        const link = window.location.search
        const searchParams = new URLSearchParams(link)

        // Retourne le nom du photographe contenu dans le lien
        return searchParams.get('photographerName')
    }

    getVideoCardDom() {
        const mediaItem = document.createElement('div')
        mediaItem.setAttribute('class', 'media__item')

        const video = document.createElement('video')
        video.setAttribute(
            'src',
            `/assets/media/${this.photographerName}/${this.video}`
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
        mediaItem.appendChild(video)
        mediaItem.appendChild(p)

        return mediaItem
    }
}
