function mediaFactory(data) {
    function getmedia(media) {
        //si c'est une image
        if(media.image){
            return `<img data-id="${media.id}" src="/assets/photographers/${photographer.name}/${media.image}" class="media_img" alt="image de ${media.title}" tabindex="0">`
        }
        //si c'est une vidéo
        else {
            return `<video data-id="${media.id}" class="media_img" aria-label="${media.title}" tabindex="0"><source src="/assets/photographers/${photographer.name}/${media.video}"></video>`
        }
      }
    function getMediaCard() {
        return `<div id="id-${data.id}">
        ${getmedia(data)}
        <div class="flex">
        <h3>${data.title}</h3>
        <h4><span>${data.likes}</span> <i class="fa-solid fa-heart off like" data-id="${data.id}"></i></h4>
        </div>
        </div>`
         
    }
    return {getMediaCard, likeUpdate}
}

  