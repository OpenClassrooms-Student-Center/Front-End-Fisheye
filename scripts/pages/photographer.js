//Mettre le code JavaScript lié à la page photographer.html

const photographerId = window.location.search.split("?id=").join("");
console.log(photographerId);
let aboutPhotographer = [];
let mediasAboutPhotographer = [];

/*
 Fonction asynchrone permettant de fetch un photograhe
 Les données du photographe iront dans la variable (tableau) aboutPhotographer
*/
const fetchMedias = async () => {
  await fetch(`../data/photographers.json`)
    .then((res) => res.json())
    .then((promise) => {
        aboutPhotographer = promise;
      console.log(promise);
    });
    return ({
        aboutPhotographer: mediasAboutPhotographer})
}
const productDisplay = async () => {
    await fetchMedias();

    // On fait une boucle for sur les medias et on compare l'id du media avec celui du photographe contenu dans photographerId
    for(i = 0; i< aboutPhotographer.media.length; i++){
        if(aboutPhotographer.media[i].photographerId == photographerId){
            mediasAboutPhotographer.push(aboutPhotographer.media[i])
            console.log(mediasAboutPhotographer)
        }else{
            console.log("error")
        }

    }
    console.log(aboutPhotographer.media[0].photographerId)

}
productDisplay()