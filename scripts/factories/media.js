
class LikesCounter{
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
        // let tabindex = given_tabindex
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
        linkCaroussel.setAttribute("aria-label","Regarder cette vidéo dans le caroussel")
        // vignette photo ou video ?
        const imgOrVideo = image? document.createElement( 'img' ): document.createElement( 'video' );
        imgOrVideo.setAttribute("id","img-or-video-"+id)
        imgOrVideo.setAttribute("src", picture)
        imgOrVideo.setAttribute("alt", title)
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

    // function ToggleLikesAndPrice(){
    //     // le nombre de likes et le prix/jour passent en invisible
    //     const likesAndPrice = document.querySelector(".likes-and-price")
    //     likesAndPrice.classList.toggle("visible")        
    //     likesAndPrice.classList.toggle("invisible")
    // }
    /** les 2 etoiles permettent d'activer le JSdoc
     * retourne le fragment HTML
     * @returns {string}
     */
    function LightBoxRender(){
        const insertLightBoxHtml =
        `<div class="lightbox-media">
        <article>
        ${(image)?("<img src='"+picture+"' alt='"+title+"'>")
            :("<video src='"+picture+"' controls type='video/mp4' alt='"+title+"'><track src='videos-track/track.vtt' kind='captions' label='Légende'></video>")}
        <h2>${title}</h2>
        </article>
        </div>`
        return insertLightBoxHtml
    }
    
    function ToggleHeartLikedClasses(el){
        el.classList.toggle('not_liked')
        el.classList.toggle('liked')
    }

    function SetListenerOnHearts(){
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

    function ToggleOthers(){
        document.querySelector(".opacity-if-modale").classList.toggle("visible")
        document.querySelector(".opacity-if-modale").classList.toggle("invisible")
        document.querySelector(".header-render").classList.toggle("visible")
        document.querySelector(".header-render").classList.toggle("invisible")
    }

    function StartCaroussel(e) {
        const mediasList = new MediasList()
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

        ToggleOthers()
        document.querySelector(".arrow-left").focus()
    }

    function SetListenerOnTitle() {
        document.querySelector("#media-"+id+" .title")
        .addEventListener('click',e => StartCaroussel(e))

    }

    function SetListenerOnClickImageOrVideo(){
        document.getElementById("to-caroussel-"+id)
            .addEventListener('click',e => StartCaroussel(e))
    }

    function SetListeners(){
        SetListenerOnHearts()
        SetListenerOnClickImageOrVideo()
        SetListenerOnTitle()
    }
    return { id, photographerId, image, video, counter, date, title, getUserCardDOM, SetListeners, LightBoxRender }
}

