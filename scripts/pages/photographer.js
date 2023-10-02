//Mettre le code JavaScript lié à la page photographer.html

async function getDataPhotographers() {

    const dataPhotographers = await fetch("../../data/photographers.json");
    return dataPhotographers.json();
}

async function displayInfo(photographer) {
    const photographerInfo = document.querySelector(".photograph-info");
    const photographerPictureSection = document.querySelector(".photograph-profilephoto")

    const photographerModel = photographInfoTemplate(photographer);
    const userCardInfoDOM = photographerModel.getUserInfoDOM();
    const photographerPicture = photographPicture(photographer);
    const userPicture = photographerPicture.getUserPicture();

    photographerInfo.appendChild(userCardInfoDOM);
    photographerPictureSection.appendChild(userPicture);

}

async function getMedia() {

    const media = await fetch("../../data/photographers.json");
    return media.json();
}

async function displayMedia(media) {
    const sectionMedia = document.querySelector(".media");

    const mediaModel = photographerMedia(media);
    const userMediaDom = mediaModel.getUserMedias();

    sectionMedia.appendChild(userMediaDom);

}



async function init() {
    // Récupère les datas des photographes selon leur id
    const { photographers } = await getDataPhotographers();

    const param = new URLSearchParams(document.location.search);
    const id = param.get("id")
    let photographer;

    if (!id) {
        console.error("missing id parameter");
        return
    }

    for (let i = 0; i < photographers.length; i++) {
        if (photographers[i].id == id) {
            photographer = photographers[i]
        }
    }

    //Récupère les médias selon l'id du photographe

    const { media } = await getDataPhotographers();

    //Media Factory

    function mediaFactory() {

        for (let i = 0; i < media.length; i++) {
            media.filter(function (videoFilter) {
                return videoFilter.photographerId
            });

            /*id = media.id[i],
                photographerId = media.photographerId[i],
                title = media.title[i],
                type = media.type[i],
                likes = media.likes[i],
                date = media.date[i],
                price = media.price[i]
        } else {
            console.error("error");
        }*/
        }

        if (media.type === "image") {

        } else {
            console.log("video check")
        }
    }
    displayInfo(photographer);
    displayMedia(media);

}


init();