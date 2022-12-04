
import { getJsonData } from "./dependances/getJsonData.js"
import { Galery,  Photograph} from "./dependances/Objects.js"
import { sortingArray, tagsEventSettings } from "./dependances/sorting/tagSort.js"
import { lightBoxEventSettings } from "./dependances/modals/lightbox.js"
import { heartEventListener, likesDrawWidget } from "./dependances/likes.js"
import { formEventListener } from "./dependances/modals/contactForm.js"
import { sortValue } from "./dependances/sorting/dropDownMenu.js"



let fullData
let photographerId
export let currentPhotographer
export let currentGalery

/*recupere les data du Json via getJsonData puis exécute articleDraw*/
const startDrawPhotographPage = async() => {
    fullData = await getJsonData()
    articleDraw()
}
/*creé les elements de la section photographe */
export const articleDraw = () => {
    
    photographerId = getId() // recupere le id du photograph
    createPhotograph() // créa la liste d'objets
    const cP = currentPhotographer
    const article = document.querySelector("article")
    const newHtml = `
        <img class = "img-profile-big"src = './assets/SamplePhotos/Photographers/${cP.newName}.jpg' alt='photo de profil de ${cP.name}' />  
        <div class = 'article-left-container'>
        <div>
        <h2>${cP.name}</h2>
        <h3>${cP.city},${cP.country}</h3>
        <h4>${cP.tagline}</h4>
        <ul>${cP.tags.map(e => {
        return `<li class = "tag ${e}" title="${e}" tabindex ="0">#${e}</li>`
    }).join("")}
      </ul>
      </div>
      <button class ="btn btn-article btn-contact">Contactez-moi</button> 
      </div>`

    article.innerHTML = newHtml;    //affiche le nouveau contenu html
    sectionsDraw()
}
/*crée les elements de la section media */
 export const sectionsDraw = (e) => {
    removeFigures() //nettoyage de la section
    createGalery()  //crée la liste des nouveaux medias 
    sortValue(e) // tri les medias en fonction des tags sélectionnés
    const section = document.querySelector("section")
    currentGalery.forEach(e => { //pour tous les medias
        const newSection = document.createElement("figure");
        newSection.classList.add(`${e.id}`)
        console.log(e.constructor.name);
        const pathName = currentPhotographer.name.split(" ")[0];
        let newHtml
        if (e.constructor.name === "Image") newHtml = `
        
        <img tabindex = "0" id = "${e.id}"class = "img-galery" src = './assets/SamplePhotos/${pathName}/${e.image}' alt='${e.title}' title ="${e.title}" />   
           
            `
        if (e.constructor.name === "Video") newHtml = `
            
            <video tabindex = "0" id = "${e.id}" title ="${e.title}" class ="video" width="350" height="300"   >
            <source src="./assets/SamplePhotos/${pathName}/${e.video}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
         
                `
        newHtml =  newHtml +`    
        <div  class = "galery-footer">  
            <h3>${e.title}</h3>
            <div class ="galery-like">
            <p id="p${e.id}">${e.likes}</p>
            <i tabindex = "0" aria-label="Like icon clickable" id="i${e.id}" class ="fas fa-heart"></i>
            </div>
        </div>`
        section.appendChild(newSection);
        newSection.innerHTML = newHtml;  //affiche le nouveau contenu html
    })
    likesDrawWidget()// dessine le widget de likes
    tagsEventSettings()//instancie les eventListener des tags
    lightBoxEventSettings() //instancie les eventListener sur les medias pour l'ouverture de la lightBox
    heartEventListener() //instancie les eventListener des icoones en forme de coeur
    formEventListener() // instancie l'eventListenr pour l'ouverture du formulaire
}
/*recupre les données dans l'url*/
function getId() {
    return window.location.href.split("?").pop()
}
/*crée une liste d'objets photograph*/
const createPhotograph = () => {
    fullData.photographData.forEach(e => {
        if (e.id.toString() === photographerId)
            currentPhotographer = new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait) //creation des objets
    })
}
/*enleve tous les enfant de la section*/
const removeFigures = () => {
    const section = document.querySelector("section")
    section.replaceChildren(); 
  }
/*crée une liste d'objets medias */
const createGalery = () => {
    currentGalery = []
    fullData.mediaData.forEach(e => {
        if (e.photographerId.toString() === photographerId) {
            let sortingToken = 0  // creation d'un ticket
            sortingArray.forEach(tag => {
                if (e.tags.includes(tag)) sortingToken++ // incrementation du ticket
            })
            if (sortingToken === sortingArray.length) { //si le ticket est bon
                if (e.image !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title, e.likes, e.date, e.price).createMedia(e))//creation des nouveaux objets
                if (e.video !== undefined) currentGalery.push(new Galery(e.id, e.photographerId, e.title,  e.likes, e.date, e.price).createMedia(e))//creation des nouveaux objets
            
        }
        }
    })
    console.log(currentGalery,"galery");
}

/*si on se trouve bien sur la page photographe alors la fonction startDrawPhotographPage est exécutée*/
const body = document.querySelector("body") 
if (body.classList.contains("photograph-pages"))document.body.onload =  startDrawPhotographPage ;