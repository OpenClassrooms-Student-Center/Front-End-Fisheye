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

        const imageName = this.image
            .replace('.jpg', '')
            .replaceAll('_', ' ')

        mediaItem.setAttribute('class', 'media__item')
        mediaItem.innerHTML = `
            <a 
                href="/assets/media/${this.photographerName}/${this.image}"
                alt="${this.title}"
            >
                <img 
                    src="/assets/media/${this.photographerName}/${this.image}" 
                    alt="${imageName}, closeup view"
                >
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
