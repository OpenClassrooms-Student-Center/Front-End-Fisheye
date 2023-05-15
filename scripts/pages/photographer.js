//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getMedias() {
    const res = await fetch("./data/photographers.json");
    const data = await res.json();

    const photographer = ({medias: [...data.media]});

    const result = photographer.medias.filter(media => media.photographerId == id);

    console.log(result);

    // const array = data.media;
    // const result = array.filter(media => media.photographerId == id);
    // console.log(result);
}

getMedias();
// console.log(id);

// utiliser la method "find()" pour récup photographe specifique
// utiliser la method "filter()" pour récup photo du photographe (media)