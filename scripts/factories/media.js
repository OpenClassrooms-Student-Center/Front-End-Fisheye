
class LikesCounter{
    constructor(id, totalLikes) {
        this._count = 0
        this._id = id
        this._totalLikes = totalLikes
        this._countTotal = new TotalLikes
    }

    update() {
        this._count++
        this._countTotal.incr()
        this._totalLikes.UserDivDOM()
        const likesCountSpan = document.querySelector('#likes-number-'+this._id)
        likesCountSpan.innerHTML = this._count
    }

    get count(){
        return this._count
    }
}

function mediaFactory(data,totalLikes) {    
    // const photographerUrl = new URL(window.location.href+"photographer.html")
    const {id, photographerId, title, image, video, likes, date, price } = data
    const counter = new LikesCounter(id,totalLikes)

    function InsertHeart(element){
        const insertHeartHtml =`
            <div class="display_or_not">
                <div id="dinl-${id}" class="display_if_not_liked not_liked">
                    <i class="fa fa-heart-o"></i>
                </div>
                <div id="dil-${id}" class="display_if_liked not_liked">
                    <i class="fa fa-heart"></i>
                </div>
            </div>`

        element.insertAdjacentHTML('beforeend', insertHeartHtml);
    }

    function getUserCardDOM(name) {
        // Construction de l'URL  photographe.html?id={id}
        // photographerUrl.searchParams.append('id',id);

        const picture = BaseURL.base + `/assets/photographers/${name.split(' ')[0].replace('-',' ')}/${image?image:video}`;
        
        // vignette photographe
        const article = document.createElement( 'article' );
        article.setAttribute("id", "media-"+id)

    
        // photo or video vignette
        const imgOrVideo = image? document.createElement( 'img' ): document.createElement( 'video' );
        imgOrVideo.setAttribute("src", picture)
        if(video){
            // pas de player controls sur les videos dans la page principale
            // a enlever sur la version finale 
            imgOrVideo.setAttribute("controls","")
            imgOrVideo.setAttribute("type","video/mp4")
        }

        // Libellé et nombre de coeurs et coeur dans une div
        const divBottom = document.createElement('div')
        divBottom.classList.add('media-bottom')
        // Nom du media
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;

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
        InsertHeart(divLikes)
        
        article.appendChild(imgOrVideo);
        divBottom.appendChild(h2)
        divBottom.appendChild(divLikes)
    
        article.appendChild(divBottom)

        return (article);
    }

    function SetListenerOnHearts(){
        const dinl = document.querySelector('#dinl-'+id)
        dinl.addEventListener('click',function f(e) {
            counter.update()
            dinl.classList.remove('not_liked')
            dinl.classList.add('liked')

            let ell = document.querySelector('#dil-'+id)
            ell.classList.remove('not_liked')
            ell.classList.add('liked')

        })
        const dil = document.querySelector('#dil-'+id)
        dil.addEventListener('click',function f(e) {
            counter.update()
        })  
    }

    return { id, photographerId, image, video, getUserCardDOM, SetListenerOnHearts }
}

