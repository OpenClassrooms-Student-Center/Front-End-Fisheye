import { tagsArray } from "../data/tags.js"
import { getJsonData } from "./dependances/getJsonData.js"
import { Photograph } from "./dependances/Objects.js"
import {  sortingArray, tagsEventSettings } from "./dependances/sorting/tagSort.js"

let newData
export let photographArray = []


/*recupere les data du Json via getJsonData puis exécute mapMainPage*/
const startDrawMainPage = async() => {
  newData = await getJsonData()
   mapMainPage()
}
/*creé les elements de la page photographe d'acceuil */
export const mapMainPage = async () => {
  removeSections()// vide le main
  tagsDraw()//affiche les tags du header
  dataSort()//tri les donnés en fonction des tags
  const main = document.querySelector("main");
  photographArray.forEach(e => { // pour tous les photographes
    const newSection = document.createElement("section");
    newSection.classList.add(`${e.id}`)
    const newHtml = `
    <a href= "./photograph.html?${e.id}">
        <img class = "img-profile-big"src = './assets/SamplePhotos/Photographers/${e.newName}.jpg' alt='photo de profil de ${e.name}' />   
        <h2>${e.name}</h2></a>
        <h3>${e.city},${e.country}</h3>
        <h4>${e.tagline}</h4>
        <p>${e.price}€/jour</p>
        <ul>${e.tags.map(e => {
      return `<li class = "tag ${e}" title="${e}" tabindex="0">#${e}</li>`
    }).join("")}
      </ul>`

    main.appendChild(newSection);
    newSection.innerHTML = newHtml; //affiche le nouveau contenu html
  })
  fixedButtonEvent() //instancie l'eventListener du bouton fixe
  tagsEventSettings() //instancie les eventListener des tags

}
/*enleve tous les enfant de la section*/
const removeSections = () => {
  const main = document.querySelector("main")
  main.replaceChildren();
}
/*crée une liste d'objets photograph en fonction des tags selectionés*/
const dataSort = () => {
  photographArray = []
  newData.photographData.forEach(e => {
  let sortingToken = 0 // creation d'un ticket
  sortingArray.forEach(tag => {
    if (e.tags.includes(tag)) sortingToken ++ //incrementation du ticket
  })
    if (sortingToken === sortingArray.length ) photographArray.push(new Photograph(e.name, e.id, e.city, e.country, e.tags, e.tagline, e.price, e.portrait)) //creation de l'objet si le ticket est bon
  })

}                    
/*creation des tags*/
const tagsDraw = () => {
  const currentDiv = document.querySelector(".tags")
  currentDiv.replaceChildren()
  tagsArray.forEach(e => { // pour tous les tags
    const newButton = document.createElement("li");
    const newContent = document.createTextNode(`#${e}`);
    newButton.classList.add("tag")
    newButton.classList.add(`${e}`)
    newButton.setAttribute("tabindex","0")
    newButton.title = `${e}`
    newButton.appendChild(newContent);
    currentDiv.appendChild(newButton);
  })
 
}

/*bouton passez au contenu qui s'affiche au sroll*/
const scrollDisplay = () => {
   const btn = document.querySelector(".main-btn")
  if (window.scrollY > 0 )btn.classList.remove("hiden")
  else btn.classList.add("hiden")
}
/*creation de l'event listener du boutons */
const fixedButtonEvent = () => {
  const btn = document.querySelector(".main-btn")
  document.addEventListener("scroll", scrollDisplay)
  btn.addEventListener("click", returnTop)
}
/*fonction pour reourné en haut de la page*/
const returnTop = () => {
  scroll(0,0)
}
/*si on se trouve bien sur la page main-page alors la fonction  startDrawMainPage est exécutée*/
const body = document.querySelector("body") 
if (body.classList.contains("main-page")) document.body.onload = startDrawMainPage;