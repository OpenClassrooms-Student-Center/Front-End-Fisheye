class Lightbox {

    static init() {
        const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]')
        
            links.forEach(link => link.addEventListener('click', e => 
        {
           e.preventDefault()
           new Lightbox(e.currentTarget.getAttribute('href')) 
        }))

    }



    /**
    * 
    * @param {string} src - The image source
    */
   constructor (url){
       const element = this.buildDom(url)
       document.body.appendChild(element)
   
   }
   
   /**
    * @param {string} src - The image source
    * @return (htmlElement)
    */
   
   buildDom(url){
       const dom = document.createElement('div')
       dom.classList.add('lightbox')
       dom.innerHTML = `
       <button class="lightbox_close">Fermer</button>
       <button class="lightbox_next">Suivant</button>
       <button class="lightbox_prev">Précédent</button>
       <div class="lightbox_container">
         <img src="${url}" alt="#">
       </div>
    `
     return dom
   }

}




Lightbox.init();

console.log('lightbox.js loaded')

/** 
 * 
 * <div class="lightbox">
        <button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class="lightbox_container">
          <img src="#" alt="#">
        </div>
      </div>
 */