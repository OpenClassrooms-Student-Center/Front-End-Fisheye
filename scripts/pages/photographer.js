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

async function getDataMedia() {

    const media = await fetch("../../data/photographers.json");
    return media.json();
}

async function displayMediaImage(image) {
    const sectionMedia = document.querySelector(".media");

    image.forEach((media) => {
        const mediaModel = photographerMediaTemplate(media);
        const userMediaDom = mediaModel.getUserMediasImage();
        sectionMedia.appendChild(userMediaDom);
    })
}

async function displayMediaVideo(video) {
    const sectionMedia = document.querySelector(".media");

    video.forEach((media) => {
        const mediaModel = photographerMediaTemplate(media);
        const userMediaDom = mediaModel.getUserMediasVideo();
        sectionMedia.appendChild(userMediaDom);
    })
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

    displayInfo(photographer);

    //Récupère les médias selon l'id du photographe

    const { media } = await getDataPhotographers();

    //Media Factory à faire

    const mediaArrayByPhotographer = photographers.find(photographerIdentity => photographerIdentity.id == id);
    let mediaArray = { media };

    if (!mediaArrayByPhotographer) {
        console.error("Photographer not found")
    }

    for (let i = 0; i < mediaArray.length; i++) {

        mediaArray.filter(typeOfMedia);
        if (typeOfMedia.type == "image") {
            return displayMediaImage()
        } else {
            return displayMediaVideo();
        }

    }
}


init();