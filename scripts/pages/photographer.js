//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //objet pour stocke le photographe
let medias = []; //tableau pour stocke les médias


async function getPhotographerAndMedia() {
        //récupérer l'id passé dans la page
let str = window.location.href;
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = parseInt(searchParams.get('id')); //parseInt pour transformer en nombre
console.log(id);
        let fetchUrl = "/data/photographers.json";
        await fetch(fetchUrl) //asynchrone
        .then((res) => res.json()) //promise
        .then((data) => {
          
            for(let i = 0; i < data.photographers.length; i++) {
                //console.log(data.photographers[i].id);
                if(id === data.photographers[i].id) {
                    photographer = data.photographers[i];
                    break;
                }
            }
            medias = data.media.filter( element => {
                /*if(id === element.photographerId) {
                    return element
                }*/
                return id === element.photographerId;
            })
            /* data.media.forEach(element => {
                if(id === element.photographerId) {
                    medias.push(element)
                }

            });*/
            console.log(medias)
            //console.log(data.media)
        })
}
const displayPhotographerAndMedia = async () =>{
    await getPhotographerAndMedia();
    document.querySelector(".photographer").innerHTML = `<div class="flex"><h2>${photographer.name}</h2><h3>${photographer.city}, ${photographer.country}</h3><h4>${photographer.tagline}</h4></div><button class="contact_button">Contactez-moi</button><img src="/assets/photographers/${photographer.portrait}" alt="photo de ${photographer.name}"></img>`;
};

displayPhotographerAndMedia();

getPhotographerAndMedia();