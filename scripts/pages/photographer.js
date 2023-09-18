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
    let totalLikes = 0;

        medias.forEach((media) => {
        // Faire la somme des likes
        // totalLikes = totalLikes + media.likes;
        totalLikes = media.reduce((acc, cur) => {
            return acc.likes + cur
        }, 0);
        console.log(totalLikes);

        // Récuperation des données média puis création de l'affichage
        const detailMedia = detailMediaTemplate(media);
        const detailMediaDOM = detailMedia.getMediaDOM();
        photographersHeader.appendChild(detailMediaDOM);
    });

    // Affichage du totalLikes et du prix
    await detailTemplate(totalLikes, user.price);
}

async function init() {
    // Récupère les datas des photographes
    const liste  = await getPhotographers();
    const user = liste.user[0];
    const media = liste.media;
    await displayUser(user);
    await displayMedia(media, user);
}

init();

