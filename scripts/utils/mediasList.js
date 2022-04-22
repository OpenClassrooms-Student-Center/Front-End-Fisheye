/**
 * Classe Singleton de gestion de la liste des medias
 * 
 */
class MediasList {
    /**
     * 
     * @param {*} mediasList : liste des medias
     * @param {*} tri : tri, par défaut "Popularité" (descendant)
     * @returns 
     */
    constructor(mediasList,tri = "Popularité"){
        if (MediasList.exists) {
            return MediasList.instance
        }
        this._mediasList = mediasList
        // Le constructeur initialise le tri (par défaut "Popularité")
        this._tri = tri
        this.sort(this._tri)
        this._mediasSection = document.querySelector(".medias_section")
        MediasList.instance = this
        MediasList.exists = true
        return this
    }

    /**
     * Le tri des medias
     * @param {*} tri 
     * @returns 
     */
    sort(tri){
        switch(tri){
            // Tri descendant
            case "Popularité":
                this._mediasList = Array.from(this._mediasList).sort((a, b) => b.counter.count - a.counter.count)
                break
            // Tri descendant
            case "Date":
                this._mediasList = Array.from(this._mediasList).sort(
                    (a, b) => (b.date > a.date)?1:-1)
                break
            // Tri ascendant
            case "Titre":
                this._mediasList = Array
                        .from(this._mediasList)
                        .sort((a,b) => (a.title >= b.title)?1:-1)
                break
        }
        return this._mediasList        
    }

    /**
     * le tableau des medias
     */
    get mediasList(){
        return this._mediasList
    }

    /**
     * render de la liste des medias
     */
    render(){
        this._mediasSection.innerHTML = ""
        this._mediasList.forEach((media,index) => {
            const userCardDOM = media.getUserCardDOM()
            this._mediasSection.appendChild(userCardDOM)
        });
    
    }

    /**
     * Tri + rendu
     * @param {*} tri 
     * @returns 
     */
    sortAndRender(tri){
        if(this._tri === tri){
            return
        }
        this.sort(tri)
        this._tri = tri
        this.render()
    }

    /**
     * 
     * @param {*} e 
     * @param {*} arrow_left : élément HTML
     * @param {*} arrow_right : élément HTML
     */
    LeftAction(e,arrow_left,arrow_right){
        if(this._indexMedia > 0) {
            this._indexMedia--
            this.CarousselRenderMedia(this._indexMedia)
            arrow_right.classList.remove("forbidden_arrow")
        }
        switch(this._indexMedia){
            case 0:
                arrow_left.classList.add("forbidden_arrow")
                break;
            default:
                arrow_left.classList.remove("forbidden_arrow")
        }

    }
    /**
     * 
     * @param {*} e : l'évènement
     * @param {*} arrow_left : élément HTML
     * @param {*} arrow_right : élément HTML
     */
    RightAction(e,arrow_left,arrow_right) {
        if((this._indexMedia+1) < this._mediasList.length) {
            this._indexMedia++
            arrow_left.classList.remove("forbidden_arrow")
            this.CarousselRenderMedia(this._indexMedia)
        }
        if((this._indexMedia+1) === this._mediasList.length){
            arrow_right.classList.add("forbidden_arrow")
        }
        else{
            arrow_right.classList.remove("forbidden_arrow")
        }
    }

    /**
     * 
     * @param {*} i : index dans le tableau des medias
     */
    CarousselRender(i=0){
        this._indexMedia = i
        this.CarousselRenderMedia(this._indexMedia)

        const carousselEl = document.querySelector(".medias_caroussel")
        const arrow_left = document.querySelector(".arrow-left")
        const arrow_right = document.querySelector(".arrow-right")

        // Gestion du clavier dans le Caroussel
        // Tab et Shift+Tab ainsi que return restent utilisables
        carousselEl.addEventListener('keyup', e => {
            switch(e.code){
                case "ArrowLeft":
                    this.LeftAction(e,arrow_left,arrow_right)
                    arrow_left.focus()
                    break;

                case "ArrowRight":
                    this.RightAction(e,arrow_left,arrow_right)
                    arrow_right.focus()
                    break;
                
                case "ArrowUp":
                    document.querySelector(".close_img").focus()
                    break;

                case "Escape":
                    closeCaroussel()
                    break;

                default:
                    break;    
                }
        })

        arrow_left.addEventListener('click',e => this.LeftAction(e,arrow_left,arrow_right))
        arrow_right.addEventListener('click',e => this.RightAction(e,arrow_left,arrow_right))
    }

    /**
     * 
     * @param {*} indexMedia : l'index du media dans le tableau des medias
     */
    CarousselRenderMedia(indexMedia){
        this._indexMedia = indexMedia
        const lightBox = document.querySelector(".media-caroussel-render")
        lightBox.innerHTML=this._mediasList[this._indexMedia].LightBoxRender()
    }

    /**
     * @returns
     */
    get indexMedia(){
        return this._indexMedia
    }
}

function closeCaroussel(){
    // les éléments qui doivent être à nouveau visible (donc navigables)
    document.querySelector(".medias_caroussel").classList.toggle("visible")
    document.querySelector(".medias_caroussel").classList.toggle("invisible")
    document.querySelector(".header-render").classList.toggle("visible")
    document.querySelector(".header-render").classList.toggle("invisible")
    document.querySelector(".opacity-if-modale").classList.toggle("visible")
    document.querySelector(".opacity-if-modale").classList.toggle("invisible")
    // On ferme le caroussel et on met le focus sur la dernière image/vidéo vue
    mL = new MediasList()
    // On met le focus sur l'élément qui était affiché dans le caroussel
    document.querySelector("#to-caroussel-"+mL.mediasList[mL.indexMedia].id).focus()
}

