import { Onephotographer } from "../factories/Onephotographer.1.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Onephotographer()
    await onePhotographer.getOnePhotographer()
})
