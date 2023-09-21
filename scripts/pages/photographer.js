import { Onephotographer } from "../factories/onePhotographer.js"
import { Insertmedias } from "../factories/Medias.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Onephotographer()
    await onePhotographer.getOnePhotographer()
    Insertmedias.init
})
