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

    /*const { media } = await getDataPhotographers();

    //Media Factory

    function mediaFactory(photographerId) {

        for (let i = 0; i < media.length; i++) {
            if (media[i].id == id) {

                id = media.id[i],
                    photographerId = media.photographerId[i],
                    title = media.title[i],
                    type = media.type[i],
                    likes = media.likes[i],
                    date = media.date[i],
                    price = media.price[i]
            } else {
                console.error("error");
            }
        }

        if (media.type === "image") {

        } else {
            console.log("video check")
        }
    }*/
    displayInfo(photographer);
    /*mediaFactory(id);*/

}


init();