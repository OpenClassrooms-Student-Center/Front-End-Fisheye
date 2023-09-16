import { PhotographerManager } from "../factories/photographerManager.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const photographerManager = new PhotographerManager()
    photographerManager.getPhotographers()
})
