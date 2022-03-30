function imageFactory(data, mediaDirectory, photographerMedia, mediaCardHtml) {
    "use strict";
    const {title, image, id, likes, date, price } = data;
    heartColor=data.liked;
    if (heartColor==undefined) {
        heartColor="far fa-heart";
    };
    function getMediaCardDOM() { 
        //Html photo card creation with image, title and likes
        mediaCardHtml+=`
        <div class="media image">
            <img src="./assets/photographers/${mediaDirectory}/${image}" alt="${title}" tabindex="0">
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <div aria-label="nombre de likes" tabindex="0">${likes}</div>
                    <div aria-label="cliquez pour liker"> <i class="${heartColor}" id="${title}" tabindex="0"></i></div> 
                </div> 
            </div>
        </div>
        `
        return mediaCardHtml;
    }
    return { likes, title, date, getMediaCardDOM }
}

function videoFactory(data,mediaDirectory,photographerMedia,mediaCardHtml){
    "use strict";
    const { title, video, id, likes, date, price } = data;
    heartColor=data.liked;
    if (heartColor==undefined) {
        heartColor="far fa-heart";
    };
    function getMediaCardDOM() { //Html video card creation with video, title and likes
        mediaCardHtml+=`
        <div class="media vid">
            <video src="./assets/photographers/${mediaDirectory}/${video}" autoplay title="${title}" tabindex="0">
            </video>
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <div aria-label="nombre de likes" tabindex="0">${likes}</div>
                    <div aria-label="cliquez pour liker"><i class="${heartColor} fa-heart" id="${title}" tabindex="0"></i></div> 
                </div>
            </div>
        </div>
        `;
        return mediaCardHtml
    }
    return { likes, title, date, getMediaCardDOM }
}

function mediaFactory(data, mediaDirectory, photographerMedia, tabindex) {
    var mediaType=Object.keys(data)[3];
    if (mediaType=="image") {
        return imageFactory(data,mediaDirectory,photographerMedia,tabindex);
    }else {
        return videoFactory(data,mediaDirectory,photographerMedia,tabindex);
    }

}
