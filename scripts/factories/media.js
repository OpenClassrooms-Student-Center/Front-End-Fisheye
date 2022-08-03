function mediaFactory(data) {
    function getmedia(media) {
        if(media.image){
            return `<img src="/assets/photographers/${photographer.name}/${media.image}" class="media_img" alt="image de ${media.image}">`
        }
        else {
            return `<video controls class="media_img"><source src="/assets/photographers/${photographer.name}/${media.video}" ></video>`
        }
      }
    function getMediaCard() {
        return `<div id="${data.id}">
        ${getmedia(data)}
        <div class="flex">
        <h3>${data.title}</h3>
        <h4>${data.likes} <i class="fa-solid fa-heart"></i></h4>
        </div>
        </div>`
    }
   
    return {getMediaCard}
}