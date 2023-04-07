import { parentDOM, mediaArrayById, userId} from "../models/photographer.js";
import { enableBodyScroll, disableBodyScroll } from "./bodyScrollLock.js";
/**
 * 
 * @property {HTMLElement} element
 * @property {{ id: number, src: string, title: string, type: "img" | "video" }[]} images 
 * @property {number} id current id
 */
export class Lightbox {

    static init () {
        let links = Array.from(document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]'))
        let images = links.map(link => {
            let id = link.getAttribute('id')
            let src = link.getAttribute('src')
            let title = link.getAttribute('alt')
            let type = src.split(".")[1] === "mp4" ? "video" : "img"

            return {id, src, title, type}
        })

        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            let {id, alt, src} = e.target
            let currentType = e.target.localName
            new Lightbox(images, id, src, alt, currentType)
        }))
    }
    
    /**
     * 
     * @param {number} id
     */
    constructor(images, id, url, title, type) {
        // init variables
        this.id = id
        this.images = images

        this.element = this.buildDom(url)
        // this.loadFactory(url)
        if(type === "img"){
            this.loadImage(id, url, title)
        }else{
            this.loadVideo(id, url, title)
        }
        // this.loadVideo(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        parentDOM.appendChild(this.element)
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    
    /**
     * 
     * @param {Media} media factory image ou une video
     */
    loadFactory(url) {
        if (url.type === 'picture') {
            this.loadImage()
        } else if (url.type === 'video') {
            this.loadVideo()
        } else {
            throw new Error('Error de chargement media')
        }
    }



    /**
     * 
     * @param {number} id Image URL 
     * @param {string} url Image URL 
     * @param {string} title Image title 
     */
    loadImage (id, url, title) {
        this.id = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')

        // loader
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)

        // title
        const titleContainer  = document.createElement('h2')
        titleContainer.classList.add('lightbox__title')
        titleContainer.innerHTML = title
        

        image.onload = () => {
          container.removeChild(loader)
          container.appendChild(image)
          container.appendChild(titleContainer)
          this.id = id
        }

        image.src = url
    }  

    // loadVideo(id, url, title) {
    //     const video = document.createElement('video')

    //     const container = this.element.querySelector('.lightbox__container')
    //     // const loader = document.createElement('div')
    //     // // loader.classList.add('lightbox__loader')
    //     // // container.appendChild(loader)
    //     container.appendChild(video)

    //     const title = document.createElement('h2')
    //     title.id= 'media-title'
    //     title.innerHTML = mediaSelectedById.find((element) => element.title = title)
    //     this.$title = title

    //     // video.onload = function () {
    //     //     container.removeChild(loader)
    //     //     container.appendChild(video)
    //     // }
    //     video.src = url
    // }

    /**
     * 
     * @param {KeyboardEvent} e
     */
    onKeyUp(e){
        if (e.key == 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }


    /**
     * Ferme la lightbox
     * @param {MouseEvent|KeyboardEvent} e
     */
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        enableBodyScroll(this.element)
        window.setTimeout(()=> {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }

     /**
     * Image suivante
     * @param {MouseEvent|KeyboardEvent} e
     */
    next(e) {
        e.preventDefault()
        let currentIndex = this.images.findIndex(image => image.id === this.id)
        if (currentIndex === this.images.length - 1) {
            currentIndex = -1
        }
        let {id, src, title} = this.images[currentIndex + 1]
        this.loadImage(id, src, title)
    }

      /**
     * Image precedente
     * @param {MouseEvent|KeyboardEvent} e
     */
    prev (e) {
        e.preventDefault()
        let currentIndex = this.images.findIndex(image => image.id === this.id)
        if (currentIndex === 0) {
            currentIndex = this.images.length
        }
        let {id, src, title} = this.images[currentIndex - 1]
        this.loadImage(id, src, title)
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDom (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML=`
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__container">   
            </div>
        `
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom    
    }


}