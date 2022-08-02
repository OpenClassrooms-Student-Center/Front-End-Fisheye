//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //objet pour stocker le photographe
let medias = []; //tableau pour stocker les médias

async function getPhotographerAndMedia() {
  //récupérer l'id passé dans la page
  let str = window.location.href;
  let url = new URL(str);
  let searchParams = new URLSearchParams(url.search);
  let id = parseInt(searchParams.get("id")); //parseInt pour transformer en nombre
  //console.log(id);
  let fetchUrl = "/data/photographers.json";
  await fetch(fetchUrl) //asynchrone
    .then((res) => res.json()) //promise
    .then((data) => {
      for (let i = 0; i < data.photographers.length; i++) {
        //console.log(data.photographers[i].id);
        if (id === data.photographers[i].id) {
          photographer = data.photographers[i];
          break;
        }
      }

      medias = data.media.filter((element) => {
       
        return id === element.photographerId;
      });
    });
}

const displayPhotographerAndMedia = async () => {
  await getPhotographerAndMedia();
  
  photographerFactory(photographer).getPhotographerCard()

  document.querySelector(".photos").innerHTML = medias
    .map(
      (media) => mediaFactory(media).getMediaCard()
    )
    .join("");
};

displayPhotographerAndMedia();

getPhotographerAndMedia();
