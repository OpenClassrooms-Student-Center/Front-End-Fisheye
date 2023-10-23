init();

async function init() {
    // Récupère les datas des photographes
    const liste  = await getPhotographers();
    const user = liste.user[0];
    const media = liste.media;

    // Card user
    await displayUser(user);
    // Liste media
    await displayMedia(media, user);
}

async function getPhotographers() {
    // Récuperer l'id de l'url
    let params = new URL(document.location).searchParams;
    let userId = parseInt(params.get('id'));

    // Récuperer le json
    let liste = [];
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        
        liste = {
            'media' : data.media.filter(x => x.photographerId === userId),
            'user' : data.photographers.filter(x => x.id === userId)
        };

    } catch (error) {
        
        console.error(error);
    }


    return (liste)
}

// Affichage du bandeau photographe
async function displayUser(user) {
    const photographersHeader = document.querySelector(".photograph-header");

    // Récuperation des données photographe puis création de l'affichage
    const detailUser = detailUserTemplate(user);
    const detailUserDOM = detailUser.getDetailDOM();
    photographersHeader.appendChild(detailUserDOM);
}

// Affichage des médias
async function displayMedia(medias, user) {
    const photographersHeader = document.querySelector(".photograph-media");
    const photographersDetail = document.querySelector(".photograph-detail");

    // Calculer le nombre de likes
    let totalLikes = medias.reduce((accumulateur , valeurCourante) => {
        return accumulateur + valeurCourante.likes;
    }, 0);


        medias.forEach((media) => {
            // Récuperation des données média puis création de l'affichage
            const detailMedia = detailMediaTemplate(media, medias.indexOf(media));
            const detailMediaDOM = detailMedia.getMediaDOM();
            photographersHeader.appendChild(detailMediaDOM);
        });

    await detailTemplate(totalLikes, user.price);
}

async function orderMedia() {
    let filtre = document.getElementById('triMedia').value;
    const liste = await getPhotographers();
    let user = liste.user[0];

    if (filtre === "popularity") {
        resetMedia();
        let media = liste.media.sort((a, b) => a.likes - b.likes);
        await displayMedia(media.reverse(), user);
    }

    if (filtre === "date") {
        resetMedia();
        let media = liste.media.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        await displayMedia(media.reverse(), user);
    }

    if (filtre === "titre") {
        resetMedia();
        let media = liste.media.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        await displayMedia(media, user);
    }
}

function resetMedia() {
    const photographersHeader = document.querySelector(".photograph-media");
    const photographersDetail = document.querySelector(".photograph-detail");

    while (photographersHeader.hasChildNodes()) {
        photographersHeader.removeChild(photographersHeader.firstChild);
    }

    while (photographersDetail.hasChildNodes()) {
        photographersDetail.removeChild(photographersDetail.firstChild);
    }
}