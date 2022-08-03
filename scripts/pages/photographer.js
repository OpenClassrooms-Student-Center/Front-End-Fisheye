//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //objet pour stocker le photographe
let medias = []; //tableau pour stocker les médias
let totalLikes = [];
let sumLikes = [];
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
      likes = medias.filter(function (like) { //stockage des likes dans le tableau totalLikes
        //console.log(like.likes)
        return totalLikes.push(like.likes)
      })
      sumLikes = totalLikes.reduce(function (a,b) { //function qui additionne les likes
        return (a + b);
        }, 0)
   
     });
}

const displayPhotographerAndMedia = async () => {
  await getPhotographerAndMedia();
  
  photographerFactory(photographer).getPhotographerCard() //appelle la function pour afficher le photographe

  document.querySelector(".photos").innerHTML = medias
    .map(
      (media) => mediaFactory(media).getMediaCard() //appelle la fonction pour afficher les médias
    )
    .join("");
    document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`; //affiche le nombre de likes
};



displayPhotographerAndMedia();

getPhotographerAndMedia();
