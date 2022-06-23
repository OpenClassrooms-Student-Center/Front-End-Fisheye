export { Lightbox }

class Lightbox {
    constructor(url, media, title, titles) {
        this.titles = titles
        this.media = media
        this.element = this.getLightbox()
        this.loadMedia(url, title)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    // Retourne l’extension de l'url
    static getExtensionUrl(url) {
        return url.split('.').pop()
    }

    // Récupère le lien et le titre du media et construit une video ou une image
    loadMedia(url, title) {
        this.url = null

        const figure = this.element.querySelector(
            '.lightbox__container__figure'
        )

        if (Lightbox.getExtensionUrl(url) === 'mp4') {
            figure.classList.add('lightbox__container__figure--mp4')
            figure.innerHTML = `
                <video  
                    alt="${title}"       
                    controls
                >
                    <source
                        src="${url}"
                        type="video/mp4"
                    >
                </video>
                <figcaption class="lightbox__container__title">
                    ${title}
                </figcaption>
            `
        } else if (Lightbox.getExtensionUrl(url) === 'jpg') {
            if (figure.classList.contains('lightbox__container__figure--mp4')) {
                figure.classList.remove('lightbox__container__figure--mp4')
            }

            figure.innerHTML = `
                <img 
                    src="${url}" 
                    alt="${title}"
                >
                <figcaption class="lightbox__container__title">
                    ${title}
                </figcaption>
            `
        } else {
            throw new Error('Unknown type format')
        }

        this.url = url
    }

    // Afficher le média suivant
    next(e) {
        e.preventDefault()
        let i = this.media.findIndex((media) => media === this.url)
        if (i === this.media.length - 1) {
            i = -1
        }
        this.loadMedia(this.media[i + 1], this.titles[i + 1])
    }

    // Afficher le média précédent
    prev(e) {
        e.preventDefault()
        let i = this.media.findIndex((media) => media === this.url)
        if (i === 0) {
            i = this.media.length
        }
        this.loadMedia(this.media[i - 1], this.titles[i - 1])
    }

    // close the modal lightbox & display the main
    close(e) {
        e.preventDefault()
        this.element.parentElement.removeChild(this.element)
        document.getElementById('main').removeAttribute('hidden')
        document.removeEventListener('keyup', this.onKeyUp)
    }

    // onKeyUp ajoute des fonctions aux touches
    onKeyUp(e) {
        e.preventDefault()

        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    // Retourne la lightbox
    getLightbox() {
        const lightbox = document.createElement('div')

        lightbox.setAttribute('class', 'lightbox')
        lightbox.setAttribute('role', 'dialog')
        lightbox.setAttribute('aria-label', 'image closeup view')
        lightbox.innerHTML = `
            <button 
                class="button-close"
                aria-label="Close dialog"
            >
                <i 
                    class="fa-solid fa-xmark"
                    aria-hidden="true"
                >
                </i>
            </button>
            <a class="lightbox__next" alt="Next image">
                <i
                    class="fa-solid fa-chevron-down fa-rotate-270"
                    aria-hidden="true"
                >
                </i>
            </a>
            <a class="lightbox__prev" alt="Previous image">
                <i
                    class="fa-solid fa-chevron-down fa-rotate-90"
                    aria-hidden="true"
                >
                </i>
            </a>
            <div class="lightbox__container">
                <figure 
                    class="lightbox__container__figure"
                >
                </figure>
            </div>
        `

        // link to close the lightbox
        lightbox
            .querySelector('.button-close')
            .addEventListener('click', this.close.bind(this))
        // link to the next media
        lightbox
            .querySelector('.lightbox__next')
            .addEventListener('click', this.next.bind(this))
        // link to the previous media
        lightbox
            .querySelector('.lightbox__prev')
            .addEventListener('click', this.prev.bind(this))
        return lightbox
    }

    // Initialise la lightbox
    static init() {
        const links = Array.from(document.querySelectorAll('.media__item a'))
        const media = links.map((link) => link.getAttribute('href'))
        const titles = links.map((title) => title.getAttribute('alt'))

        links.forEach((link) =>
            link.addEventListener('click', (e) => {
                e.preventDefault()
                document.getElementById('main').setAttribute('hidden', '')
                const lightbox = new Lightbox(
                    e.currentTarget.getAttribute('href'),
                    media,
                    e.currentTarget.getAttribute('alt'),
                    titles
                )
            })
        )
    }
}
