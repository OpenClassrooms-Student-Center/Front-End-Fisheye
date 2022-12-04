import { currentGalery, currentPhotographer } from "../photographerPage.js"
import { timeout } from "./timeoutFunction.js"

/*creation des event listeners des iconnes en forme de coeur */ 
export const heartEventListener = () => {
   const heart = document.querySelectorAll(".fa-heart")
    heart.forEach((e) => e.addEventListener("click", likesToggle))
    heart.forEach((e)=>{// pour le controle au clavier
        e.addEventListener("keydown" ,async function (e) {
            if (e.key === "Enter") {
                likesToggle(e) // inverse l'etat du like et met a jour le widget
                await timeout(500) //temporise 500ms
              }   
        })
    })
}
/* inverse l'ettat du like et met a jour le widget*/
const likesToggle = (e) => {
    if (e.target.classList.contains("fa-heart")){           //protection
    if (e.target.classList.contains("fa-heart-liked")) {    //remove like
        e.target.classList.remove("fa-heart-liked")
        currentGalery.forEach(cG => { //pour chaque element de la galerie
            if (e.target.id === `i${cG.id.toString()}`) { // si c'est le bon element
                cG.likes -= 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    else {                                                  //add like
        e.target.classList.add("fa-heart-liked")
        currentGalery.forEach(cG => {//pour chaque element de la galerie
            if (e.target.id === `i${cG.id.toString()}`) {// si c'est le bon element
                cG.likes += 1
                document.querySelector(`#p${cG.id}`).innerHTML = `${cG.likes}`
            }
        })
    }
    const likescount = likesCounter() // met a jour le nombre de likes total
    document.querySelector(".likes-count").innerHTML = `${likescount}` // met a jour le widget de likes
    
}
}
/*retourne le nombre de likes total*/
const likesCounter = () => {
    let counter = 0
    currentGalery.forEach(e => {
        counter += e.likes
    })
    return counter
}
/*crée le widget de likes*/ 
export const likesDrawWidget = () => {
    const main = document.querySelector("main")
    const newlikesWidget = document.createElement("div");
    newlikesWidget.classList.add("likes-widget")
    const likescount = likesCounter() // met a jour le nombre de likes total
    const newHtml = `
        <div>
            <p class = "likes-count">${likescount}</p>
            <i class="fas fa-heart"></i>
        </div>
        <p>${currentPhotographer.price}€/jours</p>
        `
    newlikesWidget.innerHTML = newHtml
    main.appendChild(newlikesWidget)
}