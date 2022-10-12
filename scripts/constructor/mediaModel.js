export class Media {

    baseImage = 'assets/images'

    constructor(media) {

        this.id = media.id
        this.photographerId = media.photographerId
        this.title = media.title
        this.image = media.image
        this.video = media.video
        this.likes = media.likes
        this.date = media.date
        this.price = media.price

    }


    get(property) {
        if (isset(this[property])) {
            return this[property]
        }
    }

    getAllMedia() {

        const imageTemplate = `<img class='picture' width='400px' height='350px' alt='${this.title}' src='${this.baseImage}/${this.photographerId}/${this.image}'>`
        const videoTemplate = `<video width='400px' height='350px' controls>
                                 <source alt='${this.title}' src='${this.baseImage}/${this.photographerId}/${this.video}' type="video/mp4" >
                               </video>
                               `
        let media = ''
        if (this.image) {
            media = imageTemplate
        } else {
            media = videoTemplate
        }

        const mediaTemplate = `
            <div id='${this.id}' class='card-image' data-id='${this.id}'>
                <a>${media}</a>
                <div class='img-info'>
                    <h3>${this.title}</h3>
                    ${this.date}
                    <label class='likes'><p class='likes-value'>${this.likes}</p>
                        <input type="checkbox" name="fav" />
                        <i class="fa-solid fa-heart"></i>
                    </label>
                 </div>
            </div>     
        `
        return mediaTemplate

    }

}


