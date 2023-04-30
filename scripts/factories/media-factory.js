function mediaFactory(dataMedia){
    const {likes, title, image, video, photographerId, price} = dataMedia;
    // cette fonction c'est juste un pattern pour creer
    // une image avec les likes et le titre
    const picture = `assets/photographers/Sample_Photos/${photographerId}/${image}`
    const mp4 = `assets/photographers/Sample_Photos/${photographerId}/${video}`

    function createMedia(){
        //donc en gros on doit avoir 
        // une ligne pour creer l'image
        const mediaPhotograph = video
            ? document.createElement('video')
            : document.createElement('img');
        //Une ligne qui créer une div pour contenir les élements 
        const boxMedia = document.createElement('div');
        boxMedia.classList.add('media')
        // Définir l'attribut `src` de l'élément `video` ou `img` en fonction de la valeur de `video`
        mediaPhotograph.setAttribute('src', video ? mp4 : picture);

        //afficher le content de l'image
        const imgContent = document.createElement('div')
        imgContent.classList.add('img-content')
        //une ligne qui va chercher le titre dans le json
        const imgTitle = document.createElement('p');
        imgTitle.textContent = title;
        // creation du bouton contenant le nbr de like et le bouton coeur
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        //une ligne qui va chercher le nombre de likes dans le json
        const nbrOfLikes = document.createElement('p');
        nbrOfLikes.classList.add('nbr_of_likes');
        nbrOfLikes.textContent = likes;
        // creation de l'icone
        const icone = document.createElement('i');
        icone.classList.add('fa-solid', 'fa-heart');

        imgContent.appendChild(imgTitle)
        imgContent.appendChild(likeButton)
        likeButton.appendChild(nbrOfLikes)
        likeButton.appendChild(icone)
        boxMedia.appendChild(mediaPhotograph)
        boxMedia.appendChild(imgContent)

        //et on retourne la div
        return boxMedia
    }

    return {picture , video, createMedia}
}