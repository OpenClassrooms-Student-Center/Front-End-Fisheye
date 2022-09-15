//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //objet pour stocker le photographe
let medias = []; //tableau pour stocker les médias
let totalLikes = []; // sotcke les likes
let sumLikes = ""; //stocke la somme des likes

async function getPhotographerAndMedia() {
  //récupérer l'id passé dans la page
  let str = window.location.href;
  let url = new URL(str);
  let searchParams = new URLSearchParams(url.search);
  let id = parseInt(searchParams.get("id")); //parseInt pour transformer en nombre
  let fetchUrl = "/data/photographers.json";
  await fetch(fetchUrl) //asynchrone
    .then((res) => res.json()) //promise
    .then((data) => {
      for (let i = 0; i < data.photographers.length; i++) {
        if (id === data.photographers[i].id) {
          photographer = data.photographers[i];
          break;
        }
      }
      medias = data.media.filter((element) => {
        
        return id === element.photographerId;
      });
      
      totalLikes = medias.map((media) => {return media.likes})//boucle pour mettre les likes dans totalLikes
      sumLikes = totalLikes.reduce(function (a,b) { //function qui additionne les likes
        return (a + b);
        }, 0)
        
     });
     
}

const displayPhotographerAndMedia = async () => {
  await getPhotographerAndMedia();
  
  photographerFactory(photographer).getPhotographerCard() //appelle la function pour afficher le photographe
  displayMedias()
  
    document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`; //affiche le nombre de likes
    likeUpdate();
    
};
function likeUpdate() {
    let selectLikes = document.querySelectorAll(".off");
    selectLikes.forEach(element => {
        element.onclick = function (event) {
            let id = parseInt(event.target.dataset.id);
            
            if(event.target.classList.contains("off")){//on compare s'il y a la classe off, si oui on incrémente et on enleve off, et on rajoute on
                medias.forEach((media) => {
                    if(media.id === id) { //on compare l'id d'element et celui de media.id
                        media.likes ++;
                        document.querySelector(`#id-${id} span`).innerText = media.likes;//on update le like
                        sumLikes++;//on rajoute 1 à la somme des likes
                        document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`;//on re affiche le total des likes mis à jour
                        event.target.classList.remove("off");
                        event.target.classList.add("on");
                    }
                })
            }
            else if(event.target.classList.contains("on")) { // on compare s'il y a la class on, si oui, on diminue de 1 et on enleve on et on remplace par off
                medias.forEach((media) => {
                    if(media.id === id) { //on compare l'id d'element et celui de media.id
                        media.likes --;
                        document.querySelector(`#id-${id} span`).innerText = media.likes;//on update le like
                        sumLikes--;//on soustrait 1 à la somme des likes
                        document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`;//on re affiche le total des likes mis à jour
                        event.target.classList.add("off");
                        event.target.classList.remove("on");
                    }
                })
            }
            
            
        }
    })  
}
//tri des médias
//par likes
document.querySelector("select").addEventListener("change", e=> {

  if(e.target.value == "popularity"){
   
    medias.sort((mediaA, mediaB)=> {
      return mediaA.likes - mediaB.likes
    }).reverse() //du plus grand au plus petit
    
    displayMedias();
    initLightbox();
  }
})
//par date
document.querySelector("select").addEventListener("change", e=> {

  if(e.target.value == "date"){
   
    medias.sort((mediaA, mediaB)=> {
      return new Date().valueOf(mediaA.likes) - new Date().valueOf(mediaB.likes)
    }).reverse() //du plus récent au plus ancien
   
    displayMedias();
    initLightbox();
  }
})
//par ordre alphabétique
document.querySelector("select").addEventListener("change", e=> {

  if(e.target.value == "title"){
 
    medias.sort((mediasA, mediasB) =>{
      if(medias.title > mediasB.title){
        return 1;
      }
      else if(mediasA.title < mediasB.title){
        return -1;
      }
      else {
        return 0;
      }
    })
  
    displayMedias();
    initLightbox();
  }
})

//fonction pour afficher les médias
function displayMedias() {
  document.querySelector(".photos").innerHTML = medias
  .map(
    (media) => mediaFactory(media).getMediaCard() //appelle la fonction pour afficher les médias
  )
  .join("");
  likeUpdate();
  
}

displayPhotographerAndMedia();

getPhotographerAndMedia();

