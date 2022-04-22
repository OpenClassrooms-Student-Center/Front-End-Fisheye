
class LikesCounter{
    /**
     * 
     * @param {*} media id 
     * @param {*} totalLikes pour ce photographe
     * @param {*} likes pour ce media
     */
    constructor(id, totalLikes, likes) {
        this._count = likes
        this._id = id
        this._totalLikes = totalLikes
        this._countTotal = new TotalLikes
        this._countTotal.incr(likes)
    }

    update(incr=1) {
        this._count += incr
        this._countTotal.incr(incr)
        this._totalLikes.UserDivDOM()
        const likesCountSpan = document.querySelector('#likes-number-'+this._id)
        likesCountSpan.innerHTML = this._count
    }

    get count(){
        return this._count
    }
}

/**
 * 
 * @param {*} data : les datas du json pour ce media
 * @param {*} totalLikes : le total des likes pour ce photographe
 * @param {*} photografName : le nom du photographe (pour construire l'url du contenu)
 * @returns { id, photographerId, image, video, counter, date, title, getUserCardDOM, SetListeners, LightBoxRender }
 * 3 fonctions retournées:
 * getUserCardDOM() : le render pour la vignette
 * setLIsteners() : lancement des listeners pour ce media
 * LightBoxRender() : le render pour la lightBox 
 */
function mediaFactory(data,totalLikes,photografName) {    
    const {id, photographerId, title, image, video, likes, date, price } = data
    const counter = new LikesCounter(id,totalLikes,likes)
    const name = photografName
    let clickOnHeart = false
    let sectionHTML = ""
    const picture = BaseURL.base + `assets/photographers/${name.split(' ')[0].replace('-',' ')}/${image?image:video}`;
    const arrow_left = document.querySelector(".arrow-left")
    const arrow_right = document.querySelector(".arrow-right")

    function InsertHeart(element){
            const insertHeartHtml =`
            <button id="like-${id}" class="display_or_not btn-heart" aria-label="Mettre un like">
                <div id="dinl-${id}" class="display_if_not_liked ${(clickOnHeart)?"":"not_"}liked">
                    <i class="fa fa-heart-o"></i>
                </div>
                <div id="dil-${id}" class="display_if_liked ${(clickOnHeart)?"":"not_"}liked">
                    <i class="fa fa-heart"></i>
                </div>
            </button>`

        element.insertAdjacentHTML('beforeend', insertHeartHtml);
    }

    function getUserCardDOM() {
        // si la vignette est déjà construite on renvoie la section HTML qu'on a déjà calculée
        if(sectionHTML !== ""){

            return sectionHTML
        }
        
        // vignette photographe
        const article = document.createElement( 'article' );
        article.setAttribute("id", "media-"+id)
        article.setAttribute("aria-label", title)

        // l'élément lien <a> qui contiendra le media et qui déclenche le caroussel
        const linkCaroussel = document.createElement('a')
        linkCaroussel.setAttribute("id","to-caroussel-"+id)
        linkCaroussel.setAttribute("href","#")
        linkCaroussel.setAttribute("aria-label","Regarder cette"+((image)?" Image":" Vidéo") +" dans le caroussel")
        // vignette photo ou video ?
        const imgOrVideo = image? document.createElement( 'img' ): document.createElement( 'video' );
        imgOrVideo.setAttribute("id","img-or-video-"+id)
        imgOrVideo.setAttribute("src", picture)
        imgOrVideo.setAttribute("alt", title + ((image)?" (Image)":" (Vidéo)"))
        // traitement spécial en cas de vidéo
        if(video){
            // pas de player controls sur les videos dans la page principale
            imgOrVideo.setAttribute("type","video/mp4")
            imgOrVideo.setAttribute("title",title)
            // WCAG video captions conditions
            imgOrVideo.insertAdjacentHTML('beforeend', "<track src='videos-track/track.vtt' kind='captions' label='Légende'>");
        }
    
        // Libellé et nombre de coeurs et coeur dans une div
        const divBottom = document.createElement('div')
        divBottom.classList.add('media-bottom')
        // Nom du media
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        h2.classList.add('title')

        const divLikes = document.createElement('div')
        divLikes.classList.add('hearts')
        divLikes.setAttribute("id","likes-"+id)
        // Nombre de likes
        const likes=document.createElement('span')
        likes.setAttribute("id","likes-number-"+id)
        likes.textContent = counter.count
        divLikes.appendChild(likes)
        // puis les coeurs
        InsertHeart(divLikes)
        
        linkCaroussel.appendChild(imgOrVideo);
        article.appendChild(linkCaroussel)
        divBottom.appendChild(h2)
        divBottom.appendChild(divLikes)
    
        article.appendChild(divBottom)
        article.classList.add("hover_photograf_css")
        sectionHTML = article

        return (article);
    }

    /** 
     * 
     * @returns {string} retourne le fragment HTML de la lightbox pour ce media
     */
    function LightBoxRender(){
        const insertLightBoxHtml =
        `<div class="lightbox-media">
        <article>
        ${(image)?("<img src='"+picture+"' alt='"+title+" (Image)'>")
            :("<video src='"+picture+"' controls type='video/mp4' alt='"+title+" (Vidéo)'><track src='videos-track/track.vtt' kind='captions' label='Légende'></video>")}
        <h2>${title}</h2>
        </article>
        </div>`
        return insertLightBoxHtml
    }
    
    /**
     * 
     * @param {*} el : element sur lequel on bascule les class not_liked et liked
     */
    function ToggleHeartLikedClasses(el){
        el.classList.toggle('not_liked')
        el.classList.toggle('liked')
    }

    // Si click => bascule j'aime / j'aime pas et incrément du nombre de likes
    // Attention: en cas de tri par popularité le changement n'est "wysiwyg".
    // Il faut retrier. C'est un choix de clarté de lecture pour l'utilisateur 
    function SetListenerOnHearts(){
        // Bascule J'aime - Je n'aime plus
        const likeEl = document.querySelector('#like-'+id)
        likeEl.addEventListener('click',function f(e) {
            if(!clickOnHeart){
                counter.update()
                ToggleHeartLikedClasses(document.querySelector('#dinl-'+id))
                ToggleHeartLikedClasses(document.querySelector('#dil-'+id))
                clickOnHeart = true
            }
            else{
                counter.update(-1)
                ToggleHeartLikedClasses(document.querySelector('#dil-'+id))
                ToggleHeartLikedClasses(document.querySelector('#dinl-'+id))
                clickOnHeart = false
            }
        })
    }

    // Rend invisible les sections hors caroussel
    function ToggleOthers(){
        document.querySelector(".opacity-if-modale").classList.toggle("visible")
        document.querySelector(".opacity-if-modale").classList.toggle("invisible")
        document.querySelector(".header-render").classList.toggle("visible")
        document.querySelector(".header-render").classList.toggle("invisible")
    }

    /**
     * On affiche le caroussel en partant du media sur lequel on pointe
     */
    function StartCaroussel() {
        const mediasList = new MediasList()
        // on retrouve son index dans le tableau grace à son id...
        const index = Array.from(mediasList.mediasList).findIndex(media => media.id === id)

        if(!index){
            arrow_left.classList.add("forbidden_arrow")
            arrow_right.classList.remove("forbidden_arrow")
        } else if((index+1) === mediasList.mediasList.length){
            arrow_right.classList.add("forbidden_arrow")
            arrow_left.classList.remove("forbidden_arrow")
        } else {
            arrow_left.classList.remove("forbidden_arrow")
            arrow_right.classList.remove("forbidden_arrow")
        }
        mediasList.CarousselRenderMedia(index)
        document.querySelector(".medias_caroussel").classList.toggle("visible")
        document.querySelector(".medias_caroussel").classList.toggle("invisible")

        // Rend invisible les sections hors caroussel
        ToggleOthers()
        document.querySelector(".arrow-left").focus()
    }

    // si click sur le titre, lancement du caroussel
    function SetListenerOnTitle() {
        document.querySelector("#media-"+id+" .title")
        .addEventListener('click',e => StartCaroussel())

    }

    // si click sur le media, lancement du caroussel
    function SetListenerOnClickImageOrVideo(){
        document.getElementById("to-caroussel-"+id)
            .addEventListener('click',e => StartCaroussel())
    }

    // Lors de l'init on initialise les listeners
    function SetListeners(){
        // si click sur le coeur
        SetListenerOnHearts()
        // si click sur le media
        SetListenerOnClickImageOrVideo()
        // si click sur le titre du media
        SetListenerOnTitle()
    }
    return { id, photographerId, image, video, counter, date, title, getUserCardDOM, SetListeners, LightBoxRender }
}

