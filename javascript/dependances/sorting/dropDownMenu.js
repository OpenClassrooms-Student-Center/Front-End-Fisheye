
import {currentGalery, sectionsDraw} from "../../photographerPage.js"
import { timeout } from "../timeoutFunction.js"

let sortedFullData = []
let lastSorting = "Popularité"
/*tri des medias en fonction des tags selectionnés*/
export const sortValue =(e)=>{
    console.log(e)
    let sortButtonValue
    if (e?.target.value) sortButtonValue = e.target.value;
    else if (e === undefined ){
        sortButtonValue ="first"
    }
    else  { 
        sortButtonValue = lastSorting ///start protection
     }
    console.log(sortButtonValue);
    sortedFullData = []

    if (sortButtonValue === "Popularité" ){ // classement par popularité
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.likes > b.likes ? -1:1)
    }
    else if (sortButtonValue === "Date" ){ // classement par date
       sortedFullData = currentGalery
       sortedFullData = sortedFullData.sort(function (a,b){
           const dateA = new Date(a.date).getTime()
           const dateB = new Date(b.date).getTime()
           return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
       })
    }
    else if (sortButtonValue === "Titre" ){  //classement par titre
        sortedFullData = currentGalery
        sortedFullData.sort((a,b) => a.title > b.title ? 1:-1)
    }
    if (sortButtonValue !== "first")lastSorting = sortButtonValue
    displayDropDown(sortButtonValue) // deploie le dropdown menu
} 

/*affiche le dropdown menu*/
const displayDropDown = async(sortButtonValue) => {
    
    const dropdown = document.querySelector(".dropdown-container")
   if (sortButtonValue !== "first"){ // evite le deploiement lors de la creation de la page

    if (!dropdown.classList.contains("dropdown-deploy") ){ 
        console.log("enter2");
    dropdown.classList.add("dropdown-deploy")
    dropdown.innerHTML = `
    <div class = "dropdown-list">
    <button class = "sort-atribute" value = "Popularité">Popularité <i class="fa fa-angle-up"></i></button>
    <hr>
    <button class = "sort-atribute" value = "Date">Date</button>
    <hr>
    <button class = "sort-atribute" value = "Titre">Titre</button>
    </div>
    `
    const newButtons  = document.querySelectorAll(".sort-atribute")
    newButtons.forEach(e => e.addEventListener("click" , sectionsDraw ))
    const icon = document.querySelector(".fa-angle-up")
    icon.addEventListener("click" , sectionsDraw  )
}
else { console.log("enter")  
await timeout(10) // temporisation anti rebond
    dropdown.classList.remove("dropdown-deploy")
    dropdown.innerHTML = `
    <button aria-controls="export-dropdown" aria-expanded="false" class="dropdown btn" >
      <span>${sortButtonValue} </span>
      <i class="fa fa-angle-down"></i>
    </button>
    `
  
    document.querySelector(".dropdown").addEventListener("click" , displayDropDown )
}}
}
document.querySelector(".dropdown")?.addEventListener("click" , displayDropDown )