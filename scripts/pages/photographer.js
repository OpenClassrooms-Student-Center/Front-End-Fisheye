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

async function displayUser(user) {
    console.log(user);

    const photographersHeader = document.querySelector(".photograph-header");

    const detailUser = detailUserTemplate(user);
    const detailDOM = detailUser.getDetailDOM();
    photographersHeader.appendChild(detailDOM);
}

async function init() {
    // Récupère les datas des photographes
    const liste  = await getPhotographers();
    const user = liste.user[0];
    console.log(liste.media);
    await displayUser(user);
}

init();

