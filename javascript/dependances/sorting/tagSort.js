import { mapMainPage } from "../../mainPage.js"
import { articleDraw } from "../../photographerPage.js"
import { timeout } from "../timeoutFunction.js"

export let sortingArray = []

/*creation des event listeners des tags */
export const tagsEventSettings = () => {
    const tags = document.querySelectorAll(".tag")
    tags.forEach(e => {//pour chaque tag
       
        e.addEventListener("click", tagSort)
        e.addEventListener("keydown" ,async function (e) {
            if (e.key === "Enter") {
                tagSort(e) 
                await timeout(500)
              }   
        })
    })      
}
/*tri des tags en fonction de la selection*/
const tagSort = (e) => {
    const newSortingValue = e.target.title
    if (sortingArray.includes(newSortingValue)) sortingArray = sortingArray.filter(v => v !== newSortingValue)
    else sortingArray.push(newSortingValue)
    const body = document.querySelector("body") 
    if (body.classList.contains("main-page")) mapMainPage()
    else if (body.classList.contains("photograph-pages"))  articleDraw ()
    //tag remove activity//
    const allTags = document.querySelectorAll(".tag")
    allTags.forEach(tag => { // pour tous les tags retire l'indictaeur d'activité
        if (tag.classList.contains("tag-selected")) tag.classList.remove("tag-selected")
    })
    //tag add activity//
    sortingArray.forEach(tags => {// pour tous les tags ajoute l'indicateur d'activité a ceux qui son selectionnés
        const selectedTag = document.querySelectorAll(`.${tags}`)
        selectedTag.forEach(tag => {
            if (!tag.classList.contains("tag-selected")) tag.classList.add("tag-selected")
        })
    })
    
}
