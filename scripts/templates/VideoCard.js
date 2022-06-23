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

        const videoName = this.video
            .replace('.mp4', '')
            .replaceAll('_', ' ')

        mediaItem.setAttribute('class', 'media__item')
        mediaItem.innerHTML = `
            <a 
                href="/assets/media/${this.photographerName}/${this.video}"
                alt="${this.title}"
            >
                <video 
                    src="/assets/media/${this.photographerName}/${this.video}" 
                    alt="${videoName}, closeup view"
                >
                </video>
                <div class="content">
                    <span class="title">${this.title}</span>
                    <div class="subContent">
                        <span class="likes">${this.likes}</span>
                        <i 
                            class="fa-solid fa-heart icon" 
                            data-fa-transform="up-1"
                        >
                        </i>
                    </div>
                </div>
            </a>
        `

        return mediaItem
    }
}
