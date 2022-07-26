//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //tableau pour y stocker les données du json
let medias = [];


async function getPhotographerAndMedia() {
        // Penser à remplacer par les données récupérées dans le json
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


getPhotographerAndMedia();