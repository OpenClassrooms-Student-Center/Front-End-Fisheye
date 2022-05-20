/**
 * @property {HTMlElement} element
 */
class Lightbox{

   static init () {
        const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]')
        .forEach(link => link.addEventListener('click', e => 
        {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href') )
        }))

    }
    
    /**
     * 
     * @param {string} url Url de l'image 
     */
    
    constructor (url) {
        this.element = this.buildDom(url)
        this.loadImage(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    /**
     * 
     * @param {string} url url de l'image 
     */
    loadImage(url) {
      const image = new Image();
      const container = this.element.querySelector('.lightbox__container')
      const loader = document.createElement('div')
      loader.classList.add('lightbox__loader')
      container.appendChild(loader)
      image.onload = function() {
        container.removeChild(loader)
        container.appendChild(image)
      }
      image.src = url
    }

    loadVideo(url) {
      const video = new Video();
      const container = this.element.querySelector('.lightbox__container')
      const loader = document.createElement('div')
      loader.classList.add('lightbox__loader')
      container.appendChild(loader)
      video.onload = function() {
        container.removeChild(loader)
        container.appendChild(video)
      }
      video.src = url
    }

    /**
     * 
     * @param {KeyBoardEvent} e 
     */
    onKeyUp(e) {
      if (e.key === 'Escape'){
        this.close(e)
      }
    }

    /**
     * ferme la lightbox
     * @param {MouseEvent} e 
     */
    close (e){
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(()=>{
      this.element.parentElement.removeChild(this.element)
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
    }


    /**
     * 
     * @param {string} url Url de l'image
     * @return {HTMlElement} 
     */
    buildDom(url){
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button
        class="lightbox__close"></button>
          <button class="lightbox__next"></button>
          <button class="lightbox__prev"></button>
          <div class="lightbox__container">
          </div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this) )
        
        return dom
    }

}

/**
 * <div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
          <img src="https://picsum.photos/900/1800" alt="">
        </div>
      </div>
      
 */

Lightbox.init() 