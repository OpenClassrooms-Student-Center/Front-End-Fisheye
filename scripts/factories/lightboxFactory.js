import { parentDOM, mediaArrayById, arrByID, userId} from "../models/photographer.js";
import { enableBodyScroll, disableBodyScroll } from "./bodyScrollLock.js";
/**
 * 
 * @property {HTMLElement} element
 * @property {string[]} images 
 * @property {string} url image actuellement visible
 */
export class Lightbox {

    static init () {
        // const data = Array.from(mediaSelectedById)
        const links = Array.from(document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]'))
        // console.log(links)
        const images = links.map(link => link.getAttribute('href'))

        links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('src'), images)
            }))
    }
    
    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor(url, images, title, id) {
        this.id = id
        this.images = images
        this.title = title
        this.element = this.buildDom(url)
        // this.loadFactory(url)
        this.loadImage(url)
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
    // loadFactory(url) {
    //     if (url.type === 'picture') {
    //         this.loadImage()
    //     } else if (url.type === 'video') {
    //         this.loadVideo()
    //     } else {
    //         throw new Error('Error de chargement media')
    //     }
    // }



    /**
     * 
     * @param {string} url URL de l'image
     */
    loadImage (url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)
        image.onload = () => {
          container.removeChild(loader)
          container.appendChild(image)
          container.appendChild(this.title)
          this.url = url
        }
        image.src = url

        // titre 
        // const arrByID = mediaArrayById.filter(function(mediaId){
        //     if(mediaId.photographerId == userId){
        //         return mediaId.title
        //     } 
        // });

        // console.log("liste des media:", arrByID)

        const title = document.createElement('h2')
        title.id= 'media-title'
        title.innerHTML = arrByID
        console.log(url) 
        this.title = title
        console.log('le titre est :', arrByID)
    }  

    loadVideo(url) {
        const video = document.createElement('video')

        const container = this.element.querySelector('.lightbox__container')
        // const loader = document.createElement('div')
        // // loader.classList.add('lightbox__loader')
        // // container.appendChild(loader)
        container.appendChild(video)

        // const title = document.createElement('h2')
        // title.id= 'media-title'
        // title.innerHTML = mediaSelectedById.find((element) => element.title = title)
        // this.$title = title

        // video.onload = function () {
        //     container.removeChild(loader)
        //     container.appendChild(video)
        // }
        video.src = url
    }

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
        let i = this.images.findIndex(image => image === this.url)
        if (i === this.images.length - 1) {
            i = -1
        }
        this.loadImage(this.images[i + 1])
    }

      /**
     * Image precedente
     * @param {MouseEvent|KeyboardEvent} e
     */
    prev (e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image.id === this.url.id)
        if (i === 0) {
        i = this.images.length
        }
        this.loadImage(this.images[i - 1])
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