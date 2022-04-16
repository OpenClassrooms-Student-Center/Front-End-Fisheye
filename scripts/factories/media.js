
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
    // const photographerUrl = new URL(window.location.href+"photographer.html")
    const {id, photographerId, title, image, video, likes, date, price } = data
    const counter = new LikesCounter(id,totalLikes,likes)
    const name = photografName
    let clickOnHeart = false
    let sectionHTML = ""
    const picture = BaseURL.base + `assets/photographers/${name.split(' ')[0].replace('-',' ')}/${image?image:video}`;
    const arrow_left = document.querySelector(".arrow-left")
    const arrow_right = document.querySelector(".arrow-right")

    function InsertHeart(element, given_tabindex=-1){
        const insertHeartHtml =`
            <div class="display_or_not">
                <button id="dinl-${id}" tabindex="${given_tabindex+1}" class="btn-heart display_if_not_liked ${(clickOnHeart)?"":"not_"}liked">
                    <i class="fa fa-heart-o"></i>
                </button>
                <button id="dil-${id}" tabindex="${given_tabindex+2}" class="btn-heart display_if_liked ${(clickOnHeart)?"":"not_"}liked">
                    <i class="fa fa-heart"></i>
                </button>
            </div>`

        element.insertAdjacentHTML('beforeend', insertHeartHtml);
    }

    function getUserCardDOM(given_tabindex=-1) {
        let tabindex = given_tabindex
        // if(sectionHTML !== ""){

        //     return sectionHTML
        // }
        
        // vignette photographe
        const article = document.createElement( 'article' );
        article.setAttribute("id", "media-"+id)

    
        // photo or video vignette
        const imgOrVideo = image? document.createElement( 'img' ): document.createElement( 'video' );
        imgOrVideo.setAttribute("id","img-or-video-"+id)
        imgOrVideo.setAttribute("src", picture)
        imgOrVideo.setAttribute("alt", title)
        imgOrVideo.setAttribute("tabindex",""+tabindex)
    if(video){
            // pas de player controls sur les videos dans la page principale
            // a enlever sur la version finale 
            // imgOrVideo.setAttribute("controls","")
            imgOrVideo.setAttribute("type","video/mp4")
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
        // appel de la fonction d'init de l'observer ici? 
        // plutot dans le constructeur?

        likes.textContent = counter.count
        divLikes.appendChild(likes)
        InsertHeart(divLikes, tabindex)
        
        article.appendChild(imgOrVideo);
        divBottom.appendChild(h2)
        divBottom.appendChild(divLikes)
    
        article.appendChild(divBottom)
        article.classList.add("hover_photograf_css")
        sectionHTML = article

        return (article);
    }

    function ToggleLikesAndPrice(){
        // le nombre de likes et le prix/jour passent en invisible
        const likesAndPrice = document.querySelector(".likes-and-price")
        likesAndPrice.classList.toggle("visible")        
        likesAndPrice.classList.toggle("invisible")
    }

    function LightBoxRender(){
        const insertLightBoxHtml =
        `<div class="lightbox-media">
        <article>
        ${(image)?("<img src='"+picture+"' alt='"+title+"'>")
            :("<video src='"+picture+"' controls type='video/mp4' alt='"+title+"'></video>")}
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
        const dinl = document.querySelector('#dinl-'+id)
        dinl.addEventListener('click',function f(e) {
            if(!clickOnHeart){
                counter.update()
                ToggleHeartLikedClasses(dinl)
                ToggleHeartLikedClasses(document.querySelector('#dil-'+id))
                clickOnHeart = true
            }
        })
        const dil = document.querySelector('#dil-'+id)
        dil.addEventListener('click',function f(e) {
            if(clickOnHeart){
                counter.update(-1)
                ToggleHeartLikedClasses(dil)
                ToggleHeartLikedClasses(document.querySelector('#dinl-'+id))
                clickOnHeart = false
            }
        })  
    }

    function ToggleOthers(){
        ToggleLikesAndPrice()
        document.querySelector(".opacity-if-caroussel").classList.toggle("visible")
        document.querySelector(".opacity-if-caroussel").classList.toggle("invisible")

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
    }

    function SetListenerOnTitle() {
        document.querySelector("#media-"+id+" .title")
        .addEventListener('click',e => StartCaroussel(e))

    }

    function SetListenerOnClickImageOrVideo(){
        document.getElementById("img-or-video-"+id)
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                console.log(event.code)
                if (event.code === "Enter") {
                    document.getElementById("img-or-video-"+id).click();
                }
            });

        document.getElementById("img-or-video-"+id)
            .addEventListener('click',e => StartCaroussel(e))
    }

    function SetListeners(){
        SetListenerOnHearts()
        SetListenerOnClickImageOrVideo()
        SetListenerOnTitle()
    }
    return { id, photographerId, image, video, counter, date, title, getUserCardDOM, SetListeners, LightBoxRender }
}

