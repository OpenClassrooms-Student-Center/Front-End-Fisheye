// function mediaFactory(mediaData){
//     const { name, photographerId, title, image, likes} = mediaData; 

//     const pictureMedia = `assets/photographers/Sample_Photos/${name}/${image}`;

//     function showImage(){
//         const mediatheque = document.createElement('img');
//         mediatheque.setAttribute("src", pictureMedia);

//         const mediaName = document.createElement('p');
//         mediaName.textContent = title;

//         const mediaLikes = document.createElement('p');
//         mediaLikes.textContent = likes;
        
//     }
//     return {photographerId, pictureMedia, name, showImage};
// }


function mediaFact(dataMedia){
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
        //une ligne qui va chercher le nombre de likes dans le json
        const nbrOfLikes = document.createElement('p');
        nbrOfLikes.textContent = likes;
        // ajout de l'icone
        const icone = document.createElement('i')
        icone.classList.add('fa-solid', 'fa-heart')
        //une ligne qui va chercher le titre dans le json
        const imgTitle = document.createElement('p');
        imgTitle.textContent = title;

        boxMedia.appendChild(mediaPhotograph)
        imgContent.appendChild(imgTitle)
        imgContent.appendChild(nbrOfLikes)
        nbrOfLikes.appendChild(icone)
        boxMedia.appendChild(imgContent)

        //et on retourne la div
        return boxMedia
    }
    return {picture , video, createMedia}
}