function mediaFactory(data) {    
    // const photographerUrl = new URL(window.location.href+"photographer.html")
    const {id, photographerId, title, image, video, likes, date, price } = data

    function InsertHeart(element){
        const insertHeartHtml ='<div class="display_or_not"><div class="display_if_not_liked"><i class="fa fa-heart-o fa-lg"></i></div><div class="display_if_liked"><i class="fa fa-heart fa-lg"></i></div></div>'

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
        // appel de la fonction d'init de l'observer ici? 
        // plutot dans le constructeur?
        const nbLikes = 0
        likes.textContent = ''+nbLikes
        divLikes.appendChild(likes)
        InsertHeart(divLikes)
        

        article.appendChild(imgOrVideo);
        divBottom.appendChild(h2)
        divBottom.appendChild(divLikes)
    
        article.appendChild(divBottom)

        return (article);
    }

    return { id, photographerId, image, video, getUserCardDOM }
}

