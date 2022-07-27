

/**
 * @property {HTMlElement} element
 * @property {string} images chemins des images de la lightbox
 * @property {string} url image actuellement affiché
 */
class Lightbox{
  
   static init () {
    
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        
        links.forEach(link => link.addEventListener('click', e => 
        {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'), gallery )
            
        }))
        
    }
    

    
    /**
     * 
     * @param {string} url Url de l'image 
     * @param {string[]} images chemins des images de la lightbox 
     */
    
    constructor (url, images) {
        this.element = this.buildDom(url)
        this.images =  images
        this.testUrl(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
        
    }
    testUrl(url){
      
      let urlSubstring = url.substring(url.lastIndexOf('.')+1)
      console.log(urlSubstring);
      if (urlSubstring === 'jpg'){
      this.loadImage(url)
    } else {
      this.loadVideo(url)
    }
    }
    /**
     * 
     * @param {string} url url de l'image 
     */
    loadImage(url) {
      this.url = null
      const image = new Image();
      const container = this.element.querySelector('.lightbox__container')
      const loader = document.createElement('div')
      loader.classList.add('lightbox__loader')
      container.innerHTML = ''
      container.appendChild(loader)
      
      image.onload = () => {
        container.removeChild(loader)
        container.appendChild(image)
        this.url = url 
      }
      image.src = url
    }

    loadVideo(url) {
      this.url = null
      
      const container = this.element.querySelector('.lightbox__container')
      const loader = document.createElement('div')
      
      container.innerHTML = ''
      /* container.appendChild(loader) */

      this.url = url 
      container.innerHTML =   `
      <div>
        <video autoplay controls>
          <source src="${url}" type="video/mp4">
        </video>
      </div>` 
      loader.classList.remove('lightbox__loader')
     
    }

   
    /**
     * 
     * @param {KeyBoardEvent} e 
     */
    onKeyUp(e) {
      if (e.key === 'Escape'){
        this.close(e)
      } else if (e.key === 'ArrowLeft'){
        this.prev(e)
      }else if (e.key === 'ArrowRight'){
        this.next(e)
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
     * @param {MouseEvent/KeyboardEvent} e 
     */
    next (e) {
      e.preventDefault() 
      let i = this.images.findIndex(image => image === this.url)
      
      if (i === this.images.length -1){
        i = -1
      }
      this.loadImage(this.images[i + 1])
    }
    /**
     * 
     * @param {MouseEvent/KeyboardEvent} e 
     */
    prev(e) {
      e.preventDefault() 
      let i = this.images.findIndex(image => image === this.url)
     
      if (i === 0){
        i = this.images.length
      }    
      this.loadImage(this.images[i - 1])
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
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this) )
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this) )
        
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


window.onload = Lightbox.init



export {Lightbox}