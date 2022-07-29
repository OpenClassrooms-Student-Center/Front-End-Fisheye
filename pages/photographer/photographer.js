async function getPhotographer(id) {
    const getPhotographer = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                            for (valeur of data.photographers) {
                                if (valeur.id.toString() === id) {
                                    return valeur;
                                }
                            }
                        }
                    )
            } else {
                console.error('Retour du serveur : ', response.status)
            }
        })
    return (
        await getPhotographer
    )
}

function getPhotographerId() {
    const url = window.location.href;
    const DOM_url = new URL(url);
    const search_params = new URLSearchParams(DOM_url.search);

    if (search_params.has('id')) {
        return search_params.get('id')
    }
}

async function displayPhotographerData(photographer) {
    const photographHeader = document.querySelector('.photographer-header');
    console.log(photographHeader);
    const userCardDOM = photographerFactory(photographer, 'detail');
    photographHeader.appendChild(userCardDOM);
}

async function init() {
    // Récupère les datas des photographes
    const id = getPhotographerId();
    const photographer = await getPhotographer(id);
    console.log(photographer);
    await displayPhotographerData(photographer);
}

init()
