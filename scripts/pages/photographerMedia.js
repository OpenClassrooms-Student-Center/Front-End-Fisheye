async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let fetchUrl = "/data/photographers.json";
    await fetch(fetchUrl) //asynchrone
    .then((res) => res.json()) //promise
    .then((data) => {
        photographers = data.photographers;
        medias = data.media;
        console.log(medias)

    })
  
}
getPhotographers();

//récupérer l'id passé dans la page
let str = window.location.href;
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
if(searchParams.has('id')) {
    let id = searchParams.get('id');
    console.log(id);
}

const mediaPhotographer = async () => {
    await getPhotographers();
    const photographerMedia = document.querySelector(".photos");

    medias.forEach((media)=> {
        
    })
}
mediaPhotographer();
