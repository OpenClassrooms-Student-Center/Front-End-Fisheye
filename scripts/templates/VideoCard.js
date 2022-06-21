export { VideoCard }
class VideoCard {
    constructor(video, photographer) {
        this.id = video.id
        this.title = video.title
        this.video = video.video
        this.likes = video.likes
        this.date = video.date
        this.price = video.price
        this.photographerId = video.photographerId
        this.photographerName = photographer.name
    }

    getVideoCardDom() {
        const mediaItem = document.createElement('div')
        mediaItem.setAttribute('class', 'media__item')

        const video = document.createElement('video')

        const accessibleVideoName = this.video.replace('.mp4', '')

        video.setAttribute(
            'src',
            `/assets/media/${this.photographerName}/${this.video}`
        )
        video.setAttribute('alt', `${accessibleVideoName}, closeup view`)

        const spanTitle = document.createElement('span')
        spanTitle.textContent = this.title
        spanTitle.setAttribute('class', 'title')

        const spanLikes = document.createElement('span')
        spanLikes.textContent = this.likes
        spanLikes.setAttribute('class', 'likes')

        const iconLike = document.createElement('i')
        iconLike.setAttribute('class', 'fa-solid fa-heart icon')
        iconLike.setAttribute('video-fa-transform', 'up-1')

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
