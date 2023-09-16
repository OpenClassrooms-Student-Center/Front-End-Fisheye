//Mettre le code JavaScript lié à la page photographer.html
//code de la page d'un seul photographe
//code of the page of a single photographer
//avec des classes
//async function getPhotographers() {
  //try {
    //const response = await fetch("../../data/photographers.json");
    //const data = await response.json();
    //return await data;
  //} catch (error) {
    //console.error(error);
    //return { photographers: [] };
  //}
//}

import { Onephotographer } from "../factories/onePhotographer.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Onephotographer()
    await onePhotographer.getOnePhotographer()
})
